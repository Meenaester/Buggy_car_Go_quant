import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProfilePage } from '../pages/profilepage';
import { testData } from '../utils/test-data';

test.describe('Profile Management Module', () => {

    test.beforeEach(async ({ page }) => {
        // Login first
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);
    await page.locator
});

    test('PRO-001: User can update profile', async ({ page }) => {
        const profile = new ProfilePage(page);
        // await profile.navigate();
        await profile.updateProfile('test', 'TestLast');
        const confirmation = await profile.getConfirmationMessage();
        expect(confirmation).toBeTruthy();
        expect(await profile.getFieldValue('firstName')).toBe('TestFirst');
        expect(await profile.getFieldValue('lastName')).toBe('TestLast');
    });

    // test('PRO-002: Only logged-in users can update profile', async ({ page }) => {
    //     // Logout user
    //     await page.goto('https://buggy.justtestit.org/logout');
    //     const profile = new ProfilePage(page);
    //     await profile.navigate();
    //     expect(page.url()).toContain('/login');
    // });

    // test('PRO-003: Error messages for invalid input', async ({ page }) => {
    //     const profile = new ProfilePage(page);
    //     await profile.navigate();
    //     await profile.updateProfile('Invalid123', 'Test', 'Other');
    //     const error = await profile.getErrorMessage('input[name="firstName"] + .error-message');
    //     expect(error).toBeTruthy();
    // });

    // test('PRO-004: Enter 200+ characters in Last Name', async ({ page }) => {
    //     const profile = new ProfilePage(page);
    //     await profile.navigate();
    //     const longLastName = 'a'.repeat(200);
    //     await profile.updateProfile('Test', longLastName, 'Other');
    //     const lastNameValue = await profile.getFieldValue('lastName');
    //     expect(lastNameValue && lastNameValue.length <= 200).toBeTruthy();
    // });

    // test('PRO-005: Profile page responsive on mobile', async ({ browser }) => {
    //     const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
    //     const page = await context.newPage();
    //     const loginPage = new LoginPage(page);
    //     await loginPage.navigate();
    //     await loginPage.login(testData.loginValid.login, testData.loginValid.password);

    //     const profile = new ProfilePage(page);
    //     await profile.navigate();
    //     expect(await page.isVisible('input[name="firstName"]')).toBeTruthy();
    //     await context.close();
    // });

    // test('PRO-006: Form fields keyboard navigable', async ({ page }) => {
    //     const profile = new ProfilePage(page);
    //     await profile.navigate();
    //     await page.keyboard.press('Tab');
    //     expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('INPUT');
    // });

    // test('PRO-007: Changes persist after logout/login', async ({ page }) => {
    //     const profile = new ProfilePage(page);
    //     await profile.navigate();
    //     await profile.updateProfile('PersistFirst', 'PersistLast', 'Other');

    //     // Logout and login again
    //     await page.goto('https://buggy.justtestit.org/logout');
    //     const loginPage = new LoginPage(page);
    //     await loginPage.navigate();
    //     await loginPage.login(testData.loginValid.login, testData.loginValid.password);

    //     await profile.navigate();
    //     expect(await profile.getFieldValue('firstName')).toBe('PersistFirst');
    //     expect(await profile.getFieldValue('lastName')).toBe('PersistLast');
    // });

});
