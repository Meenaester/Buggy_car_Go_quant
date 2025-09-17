import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { testData } from '../utils/test-data';

test.describe('Home / Overall Rating Tests', () => {

    test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);
        // await page.setViewportSize({ width: 1280, height: 800 });
         const home = new HomePage(page);
        // await home.navigate();
    });

    test('HOM-001: Car list loads with name, image, rank, votes', async ({ page }) => {
        const home = new HomePage(page);
        const cars = await home.getCarList();
        expect(cars.length).toBeGreaterThan(0);
        for (const car of cars) {
            expect(car.name).toBeTruthy();
            expect(car.image).toBeTruthy();
            expect(car.rank).toBeTruthy();
            expect(car.votes).toBeTruthy();
        }
    });

    test('HOM-002: Sorting by Votes', async ({ page }) => {
        const home = new HomePage(page);
        await home.sortByVotes();
        const cars = await home.getCarList();
        const votes = cars.map(c => Number(c.votes?.replace(/,/g, '')));
        const sortedVotes = [...votes].sort((a, b) => b - a);
        expect(votes).toEqual(sortedVotes);
    });

    test('HOM-003: Sorting by Rank', async ({ page }) => {
        const home = new HomePage(page);
        await home.sortByRank();
        const cars = await home.getCarList();
        const ranks = cars.map(c => Number(c.rank));
        const sortedRanks = [...ranks].sort((a, b) => a - b);
        expect(ranks).toEqual(sortedRanks);
    });

    test('HOM-004: Pagination works correctly', async ({ page }) => {
        const home = new HomePage(page);
        await home.goToPage(2);
        const cars = await home.getCarList();
        expect(cars.length).toBeGreaterThan(0);
    });

    test('HOM-005: Car images displayed correctly', async ({ page }) => {
        const home = new HomePage(page);
        const cars = await home.getCarList();
        for (let i = 0; i < cars.length; i++) {
            const loaded = await home.isImageLoaded(`.car-item:nth-child(${i + 1}) img`);
            expect(loaded).toBe(true);
        }
    });

    test('HOM-006: Hover effects on car items', async ({ page }) => {
        const home = new HomePage(page);
        await home.hoverOverCar(0); // Hover first car
        // Can optionally check CSS change or tooltip
        const tooltip = await page.$('.tooltip');
        expect(tooltip).toBeTruthy();
    });

    test('HOM-007: SQL injection blocked', async ({ page }) => {
        const home = new HomePage(page);
        await home.enterSearchQuery("1'; DROP TABLE cars;--");
        const cars = await home.getCarList();
        expect(cars.length).toBeGreaterThan(0); // Input ignored
    });

    test('HOM-008: Page loads <3 sec', async ({ page }) => {
        const home = new HomePage(page);
        const loadTime = await home.getPageLoadTime();
        expect(loadTime).toBeLessThan(3000);
    });

    test('HOM-009: Page responsive on mobile/tablet', async ({ browser }) => {
        const context = await browser.newContext({ viewport: { width: 375, height: 812 } }); // iPhone X
        const page = await context.newPage();
        const home = new HomePage(page);
        await home.navigate();
        expect(await page.isVisible('.car-item')).toBeTruthy();
        await context.close();
    });

    test('HOM-010: Car images have alt text', async ({ page }) => {
        const home = new HomePage(page);
        const cars = await page.$$eval('.car-item img', imgs => imgs.map(i => i.getAttribute('alt')));
        for (const alt of cars) {
            expect(alt).toBeTruthy();
        }
    });

    test('HOM-011: Access non-existent page', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigateToInvalidPage(8);
        const notFound = await page.textContent('body');
        expect(notFound).toMatch(/404|Page not found/i);
    });

});
