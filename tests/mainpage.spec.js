import { test, expect } from '@playwright/test';

test.describe('Main Page Feedback Form', () => {

    test.beforeEach(async ({ page }) => {
    // Open the UI
        await page.goto('/');
    });

    test('submit feedback shows success message', async ({ page }) => {

        // Click the button using XPath
        await page.locator('xpath=//*[@id="root"]/form/button').click();

        // Assert popup / message is visible with correct text
        const successMessage = page.locator('text=Feedback submitted!');
        await expect(successMessage).toBeVisible();
    });

    test('Click through the tabs and ensure the appropriate questions have loaded', async ({ page }) => {

        await page.locator('text=GROWTH').click();
        await expect(
        page.locator('xpath=//*[@id="tabpanel-2"]/div/div/details[1]/summary/div/div/div')
        ).toHaveText('Did Mitchell seek feedback to improve his work?');

        await page.locator('text=VALUES').click();
        await expect(
        page.locator('//*[@id="tabpanel-1"]/div/div/details[1]/summary/div/div/div')
        ).toHaveText('Did Mitchell support company values in his daily work?');

        await page.locator('text=PERFORMANCE').click();
        await expect(
        page.locator('//*[@id="tabpanel-0"]/div/div/details[1]/summary/div/div/div')
        ).toHaveText('Did Mitchell meet his performance goals for this period?');

        await page.locator('text=ENGAGEMENT').click();
        await expect(
        page.locator('//*[@id="tabpanel-3"]/div/div/details[1]/summary/div/div/div')
        ).toHaveText('Did Mitchell attend team meetings regularly?');
    });

    test('Add a teammate that does not exist and ensure teammate is in the dropdown', async ({ page }) => {

        await page.locator('xpath=//*[@id="_r_0_"]').fill('abcxyz');

        await page.locator('text=Add').click();
        
        await page.locator('xpath=//*[@id="_r_0_"]').click();

        await expect(page.locator('text=abcxyz')).toBeVisible();
    });
});