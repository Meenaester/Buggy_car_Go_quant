import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { testData } from '../utils/test-data';

test.describe('Login Module Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('LOG-001: Login with valid credentials', async ({ page }) => {
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);
        expect(page.url()).toContain('/buggy');
    });

    test('LOG-002: Login fails with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();

    // Attempt login with invalid credentials
    await loginPage.login(testData.loginInvalid.login, testData.loginInvalid.password);

    // 
    // const error = await loginPage.getErrorMessage();
    // expect(error?.trim()).toContain('Invalid username or password');

    
    const warningLabel = page.locator('.label.label-warning');
    const warningText = await warningLabel.textContent();
    expect(warningText?.trim()).toContain('Invalid username/password');
});


    test('LOG-004: Login button disabled until fields filled', async ({ page }) => {
        let disabled = await loginPage.isLoginButtonDisabled();
        expect(disabled).toBe(true);

        await page.fill('input[name="login"]', testData.loginValid.login);
        disabled = await loginPage.isLoginButtonDisabled();
        expect(disabled).toBe(true);

        await page.fill('input[name="password"]', testData.loginValid.password);
        disabled = await loginPage.isLoginButtonDisabled();
        expect(disabled).toBe(false);
    });

    

    test('LOG-005: Error messages are user-friendly (UX)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('wronguser', 'wrongpass');
         const warningLabel = page.locator('.label.label-warning');
    const warningText = await warningLabel.textContent();
    expect(warningText?.trim()).toContain('Invalid username/password');
});
    

    test('LOG-006: Login page loads <2 sec (Performance)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        const loadTime = await loginPage.getPageLoadTime();
        expect(loadTime).toBeLessThan(2000);
    });

    test('LOG-007: Login page responsive on mobile (Responsive)', async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 375, height: 812 } // iPhone X size
    });
    const mobilePage = await context.newPage();
    const loginPage = new LoginPage(mobilePage);
    await loginPage.navigate();

    // Corrected: use locator().isVisible()
    const usernameInput = mobilePage.locator('input[name="login"]');
    expect(await usernameInput.isVisible()).toBeTruthy();

    await context.close();
});


    test('LOG-008: Form keyboard navigable (Accessibility)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await page.keyboard.press('Tab');
        expect(await page.evaluate(() => document.activeElement?.getAttribute('name'))).toBe('username');
        await page.keyboard.press('Tab');
        expect(await page.evaluate(() => document.activeElement?.getAttribute('name'))).toBe('password');
        await page.keyboard.press('Tab');
        expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('BUTTON'); // Login button
    });

    test('LOG-009: Attempt login with blank fields (Negative)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('', '');
        const warningLabel = page.locator('.jumbotronjumbotron-fluid');
    const warningText = await warningLabel.textContent();
    expect(warningText?.trim()).toContain('Please fill');
    })

    test('LOG-010: Login with 200+ characters in username (Negative)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        const longUsername = 'a'.repeat(200);
        await loginPage.login(longUsername, 'SomePass@123');
        const error = await loginPage.getErrorMessage();
        expect(error).toMatch(/invalid|truncated/);
    });

});
