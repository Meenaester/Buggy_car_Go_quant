import { Page } from '@playwright/test';

export class ModelPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToModel(carIndex: number = 0) {
        // Click a car from Home page to open model details
        const cars = await this.page.$$('.car-item');
        await cars[carIndex].click();
    }

    async getVotesCount(): Promise<number> {
        const votesText = await this.page.textContent('.votes-count');
        return votesText ? Number(votesText) : 0;
    }

    async addComment(comment: string) {
        await this.page.fill('textarea[name="comment"]', comment);
        await this.page.click('button[type="submit"]'); // Submit comment
    }

    async getComments() {
        return await this.page.$$eval('.comment-item', comments =>
            comments.map(c => ({
                username: c.querySelector('.username')?.textContent,
                timestamp: c.querySelector('.timestamp')?.textContent,
                text: c.querySelector('.comment-text')?.textContent
            }))
        );
    }

    async upvote() {
        await this.page.click('button.upvote');
    }

    async downvote() {
        await this.page.click('button.downvote');
    }

    async getPageLoadTime(): Promise<number> {
        return await this.page.evaluate(() => {
            const [navigation] = performance.getEntriesByType('navigation');
            return navigation ? (navigation as PerformanceNavigationTiming).loadEventEnd : 0;
        });
    }

    async isCommentBoxVisible(): Promise<boolean> {
        return await this.page.isVisible('textarea[name="comment"]');
    }
}
