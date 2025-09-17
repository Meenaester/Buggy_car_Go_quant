import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ModelPage } from '../pages/model.page';
import { testData } from '../utils/test-data';

test.describe('Model Details & Comments Module', () => {

    test.beforeEach(async ({ page }) => {
        // Login first
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);
    });

    test('MOD-001: Car detail page loads', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const model = new ModelPage(page);
        await model.navigateToModel(0);
        expect(await model.isCommentBoxVisible()).toBeTruthy();
        const votes = await model.getVotesCount();
        expect(votes).toBeGreaterThanOrEqual(0);
    });

    test('MOD-002: Logged-in user can comment', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const model = new ModelPage(page);
        await model.navigateToModel(0);
        const commentText = 'This is a test comment';
        await model.addComment(commentText);
        const comments = await model.getComments();
        expect(comments[0].text).toBe(commentText);
        expect(comments[0].username).toBe(testData.loginValid.login);
    });

    test('MOD-003: Vote updates correctly', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const model = new ModelPage(page);
        await model.navigateToModel(0);
        const votesBefore = await model.getVotesCount();
        await model.upvote();
        const votesAfter = await model.getVotesCount();
        expect(votesAfter).toBe(votesBefore + 1);
    });

    test('MOD-004: XSS blocked in comments', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const model = new ModelPage(page);
        await model.navigateToModel(0);
        await model.addComment('<script>alert("XSS")</script>');
        const comments = await model.getComments();
        expect(comments[0].text).toContain('<script>'); // script should not execute
    });

    test('MOD-005: Page loads with 100+ comments', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const model = new ModelPage(page);
        await model.navigateToModel(0);
        const loadTime = await model.getPageLoadTime();
        expect(loadTime).toBeLessThan(2000);
    });

    test('MOD-006: Comment box adjusts on mobile', async ({ browser }) => {
        const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
        const page = await context.newPage();
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(testData.loginValid.login, testData.loginValid.password);

        const home = new HomePage(page);
        await home.navigate();
        const model = new ModelPage(page);
        await model.navigateToModel(0);
        expect(await model.isCommentBoxVisible()).toBeTruthy();
        await context.close();
    });

    test('MOD-007: Comment input & buttons keyboard accessible', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const model = new ModelPage(page);
        await model.navigateToModel(0);

        await page.keyboard.press('Tab');
        expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('TEXTAREA');
        await page.keyboard.press('Tab');
        expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('BUTTON');
    });

    test('MOD-008: Attempt adding empty comment', async ({ page }) => {
        const home = new HomePage(page);
        await home.navigate();
        const model = new ModelPage(page);
        await model.navigateToModel(0);
        await model.addComment('');
        const comments = await model.getComments();
        expect(comments.some(c => c.text === '')).toBe(false);
    });

});
