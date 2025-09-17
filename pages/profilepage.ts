import { Page } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // async navigate() {
    //     await this.page.goto('https://buggy.justtestit.org/home');
    // }

    async updateProfile(firstName: string, lastName: string) {
        await this.page.fill('input[name="firstName"]', firstName);
        await this.page.fill('input[name="lastName"]', lastName);
        // await this.page.selectOption('select[name="gender"]');
        await this.page.click('button[type="submit"]');
    }

    async getFieldValue(fieldName: string): Promise<string | null> {
        return await this.page.inputValue(`input[name="${fieldName}"]`);
    }

    async getErrorMessage(fieldSelector: string): Promise<string | null> {
        return await this.page.textContent(fieldSelector);
    }

    async getConfirmationMessage(): Promise<string | null> {
        return await this.page.textContent('.success-message');
    }
}
