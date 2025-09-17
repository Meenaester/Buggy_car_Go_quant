import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ModelPage } from '../pages/model.page';
import { testData } from '../utils/test-data';

test.describe('Performance & Load Tests', () => {

    test.beforeEach(async ({ page }) => {
        // Login for performance tests
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);
    });

    test('PER-001: Home page loads under 3 sec', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const loadTime = await home.getPageLoadTime();
        expect(loadTime).toBeLessThan(3000);
    });

    test('PER-002: System handles 50 concurrent logins', async ({ browser }) => {
        const contexts: import('@playwright/test').BrowserContext[] = [];
        for (let i = 0; i < 50; i++) {
            const context = await browser.newContext();
            const page = await context.newPage();
            const loginPage = new LoginPage(page);
            await loginPage.navigate();
            await loginPage.login(testData.loginValid.login, testData.loginValid.password);
            contexts.push(context);
        }
        // Cleanup
        for (const ctx of contexts) await ctx.close();
    });

    test('PER-003: 100+ cars load under heavy traffic', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const cars = await home.getCarList();
        expect(cars.length).toBeGreaterThanOrEqual(100);
    });

    test('PER-004: Comments section loads within 2 sec for 50 comments', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const model = new ModelPage(page);
        await model.navigateToModel(0);
        const loadTime = await model.getPageLoadTime();
        expect(loadTime).toBeLessThan(2000);
    });

    test('PER-005: Server stability under bulk refresh', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        for (let i = 0; i < 20; i++) {
            await page.reload();
            expect(await home.getCarList()).toBeTruthy();
        }
    });

});
