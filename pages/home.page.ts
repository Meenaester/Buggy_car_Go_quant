import { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://buggy.justtestit.org/home');
    }

    async getCarList() {
    // Wait for at least one car-item to appear
    await this.page.waitForSelector('.car-item', { timeout: 100000 });

    // Now safely evaluate all car items
    return await this.page.$$eval('.car-item', cars =>
        cars.map(car => ({
            name: car.querySelector('.car-name')?.textContent?.trim(),
            image: car.querySelector('img')?.getAttribute('src'),
            rank: car.querySelector('.car-rank')?.textContent?.trim(),
            votes: car.querySelector('.car-votes')?.textContent?.trim()
        }))
    );

    }

    async sortByVotes() {
        await this.page.click('button#sort-by-votes');
    }

    async sortByRank() {
        await this.page.click('button#sort-by-rank');
    }

    async goToPage(pageNumber: number) {
        await this.page.click(`.pagination button:text("${pageNumber}")`);
    }

    async getPageLoadTime(): Promise<number> {
        return await this.page.evaluate(() => {
            const [navigation] = performance.getEntriesByType('navigation');
            return navigation ? (navigation as PerformanceNavigationTiming).loadEventEnd : 0;
        });
    }

    async isImageLoaded(selector: string): Promise<boolean> {
        return await this.page.$eval(selector, (img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
    }

    async hoverOverCar(index: number) {
        const cars = await this.page.$$('.car-item');
        await cars[index].hover();
    }

    async enterSearchQuery(query: string) {
        await this.page.fill('input[name="search"]', query);
        await this.page.press('input[name="search"]', 'Enter');
    }

    async navigateToInvalidPage(pageNumber: number) {
        await this.page.goto(`https://buggy.justtestit.org/home?page=${pageNumber}`);
    }
}
