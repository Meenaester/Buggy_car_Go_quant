import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ModelPage } from '../pages/model.page';
import { testData } from '../utils/test-data';

test.describe('Security Tests', () => {

    test('SEC-001: HTTPS enforced', async ({ page }) => {
        await page.goto('http://buggy.justtestit.org', { waitUntil: 'load' });
        expect(page.url().startsWith('https')).toBe(true);
    });

    test('SEC-002: Session tokens cleared after logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);
        await page.goto('https://buggy.justtestit.org/logout');
        await page.goBack();
        expect(page.url()).toContain('/login');
    });

    test('SEC-003: SQL injection blocked', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);
        const home = new HomePage(page);
        await home.navigate();
        await home.enterSearchQuery("1'; DROP TABLE users;--");
        const cars = await home.getCarList();
        expect(cars.length).toBeGreaterThan(0);
    });

    test('SEC-004: XSS blocked', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);
        const model = new ModelPage(page);
        await model.navigateToModel(0);
        await model.addComment('<script>alert("XSS")</script>');
        const comments = await model.getComments();
        expect(comments[0].text).toContain('<script>');
    });

    test('SEC-005: CSRF protection', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);
        // Simulate forged request (example: fetch from console)
        const response = await page.request.post('https://buggy.justtestit.org/profile/update', {
            data: { firstName: 'CSRF', lastName: 'Attack' }
        });
        expect(response.status()).toBe(403);
    });

    test('SEC-006: Brute-force attack triggers lockout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        for (let i = 0; i < 5; i++) {
            await loginPage.login(testData.loginValid.login, 'WrongPassword@123');
        }
        const error = await loginPage.getErrorMessage();
        expect(error).toMatch(/locked|captcha/i);
    });

});
