import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://buggy.justtestit.org/login');
    }

    async login(username: string, password: string) {
        await this.page.fill('input[name="login"]', username);
        await this.page.fill('input[name="password"]', password);
        await this.page.click('button[type="submit"]');
    }

    async getErrorMessage() {
        return await this.page.textContent('.error-message');
    }

    async isLoginButtonDisabled(): Promise<boolean> {
        const disabled = await this.page.getAttribute('button[type="submit"]', 'disabled');
        return disabled !== null;
    }

    async getPageLoadTime(): Promise<number> {
        return await this.page.evaluate(() => {
            const [navigation] = performance.getEntriesByType('navigation');
            return navigation ? (navigation as PerformanceNavigationTiming).loadEventEnd : 0;
        });
    }
}
