import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';
import { testData } from '../utils/test-data';

test.describe('Registration Module Tests', () => {

    let register: RegisterPage;

    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1000, height: 900 });  // Ensure consistent viewport
        register = new RegisterPage(page);
        await register.navigate();
    });

    test('REG-001: Successful registration with unique login', async ({ page }) => {
        const uniqueLogin = `user${Date.now()}`;

        await register.register(
            uniqueLogin,
            testData.validUser.firstname,
            testData.validUser.lastname,
            testData.validUser.password,
            testData.validUser.confirmPassword
        );

        const successMessage = await register.getSuccessMessage();
    expect(successMessage.trim()).toContain('Registration is successful');
});

    
    test('REG-002: Fail registration with duplicate username', async ({ page }) => {
        const user = testData.existingUser;

        await register.register(user.login, user.firstname, user.lastname, user.password, user.confirmPassword);

        const error = await register.getErrorMessage();
        expect(error).toContain('UsernameExistsException: User already exists');
    });

    test('REG-003: Cancel button redirects to home/login', async ({ page }) => {
        await register.cancelRegistration();
        expect(page.url()).not.toContain('/register');
    });

    test('REG-004: Weak password is rejected', async ({ page }) => {
        const user = testData.weakPasswordUser;

        await register.register(user.login, user.firstname, user.lastname, user.password, user.confirmPassword);

        const error = await register.getErrorMessage();
       expect(error).toContain('minimum field size of 6');

    });

    test('REG-005: Mandatory fields cannot be blank', async ({ page }) => {
        await register.register('', '', '', '', '');

    const isEnabled = await register.isRegisterButtonEnabled();
    expect(isEnabled).toBe(false);  // Expect the register button to be disabled
});

    test('REG-006: SQL injection blocked', async ({ page }) => {
        const user = testData.sqlInjection;

        await register.register(user.login, user.firstname, user.lastname, user.password, user.confirmPassword);

        const error = await register.getErrorMessage();
        expect(error).toContain('InvalidParameterException');
    });

    test('REG-007: Password fields are masked', async ({ page }) => {
        const masked = await register.isPasswordMasked();
        expect(masked).toBe(true);
    });

    test('REG-008: Page loads in <3 seconds', async ({ page }) => {
        const loadTime = await register.getPageLoadTime();
        expect(loadTime).toBeLessThan(3000);
    });

    test('REG-009: Only spaces in username rejected', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    await register.register('   ', 'Space', 'User', testData.validUser.password, testData.validUser.confirmPassword);

    const error = await page.locator('.alert.alert-danger', { hasText: 'Login is required' }).textContent();
    expect(error?.trim()).toContain('Login is required');
});


   test('REG-010: Invalid characters in username rejected', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.navigate();

    const user = testData.invalidCharacters;

    await register.register(user.login, user.firstname, user.lastname, user.password, user.confirmPassword);

    const error = await page.locator('.alert.alert-danger', { hasText: 'Invalid characters' }).textContent();
    expect(error?.trim()).toContain('Invalid characters');
});

});