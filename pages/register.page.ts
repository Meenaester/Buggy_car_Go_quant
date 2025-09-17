import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly firstnameInput: Locator;
    readonly lastnameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.firstnameInput = page.locator('#firstName');
        this.lastnameInput = page.locator('#lastName');
        this.passwordInput = page.locator('#password');
        this.confirmPasswordInput = page.locator('#confirmPassword');
        this.registerButton = page.locator('button.btn.btn-default[type="submit"]');
        this.cancelButton = page.locator('a.btn[role="button"][href="/"]');
        this.errorMessage = page.locator('.result.alert.alert-danger');
   
    }

    async navigate() {
        await this.page.goto('https://buggy.justtestit.org/register');
    }
async isRegisterButtonEnabled(): Promise<boolean> {
    return await this.registerButton.isEnabled();
}

    async register(login: string, firstname: string, lastname: string, password: string, confirmPassword: string) {
        await this.usernameInput.fill(login);
        await this.firstnameInput.fill(firstname);
        await this.lastnameInput.fill(lastname);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);

        await this.registerButton.scrollIntoViewIfNeeded();
        await this.registerButton.click();
    }

    async cancelRegistration() {
        await this.cancelButton.click();
    }

    async getErrorMessage(): Promise<string> {
        const message = await this.errorMessage.textContent();
        return message ? message.trim() : '';
    }

    async getSuccessMessage(): Promise<string> {
        const message = await this.page.locator('.result.alert.alert-success').textContent();
        return message ? message.trim() : '';
    }

    async isPasswordMasked(): Promise<boolean> {
        const type = await this.passwordInput.getAttribute('type');
        return type === 'password';
    }

    async getPageLoadTime(): Promise<number> {
        const start = Date.now();
        await this.page.goto('https://buggy.justtestit.org/register');
        const end = Date.now();
        return end - start;
    }
}
