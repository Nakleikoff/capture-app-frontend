import { test, expect } from '@playwright/test';

test.describe('Main Page Feedback Form', () => {

    test.beforeEach(async ({ page }) => {
    // Open the UI
        await page.goto('/');
    });

    test('submit feedback shows success message', async ({ page }) => {
        // Activate teammates list
        await page.locator('form .MuiAutocomplete-root .MuiInputBase-root .MuiInputBase-input').click();
        // Select a teammate
        await page.locator('form .MuiPopper-root ul li').click();

        // Click the button using XPath
        await page.locator('xpath=//*[@id="root"]/form/button').click();

        // Assert popup / message is visible with correct text
        const successMessage = page.locator('text=Feedback submitted!');
        await expect(successMessage).toBeVisible();
    });

    test('Click through the tabs and ensure the appropriate questions have loaded', async ({ page }) => {
        // Activate teammates list
        await page.locator('form .MuiAutocomplete-root .MuiInputBase-root .MuiInputBase-input').click();
        // Select a teammate
        await page.locator('form .MuiPopper-root ul li').click();

        await page.locator('text=COMMUNICATION').click();
        await expect(
            page.locator('//*[@id="tabpanel-0"]/div/div/details[1]/summary/div/div/div')
        ).toHaveText('Does the teammate communicate clearly and effectively?');

        await page.locator('text=TECHNICAL SKILLS').click();
        await expect(
            page.locator('//*[@id="tabpanel-1"]/div/div/details[1]/summary/div/div/div')
        ).toHaveText('Does the teammate demonstrate strong technical abilities?');

        await page.locator('text=TEAMWORK').click();
        await expect(
            page.locator('//*[@id="tabpanel-2"]/div/div/details[1]/summary/div/div/div')
        ).toHaveText('Does the teammate collaborate well with others?');

        await page.locator('text=PROBLEM SOLVING').click();
        await expect(
            page.locator('//*[@id="tabpanel-3"]/div/div/details[1]/summary/div/div/div')
        ).toHaveText('Does the teammate approach problems analytically?');
    });

    test('Add a teammate that does not exist and ensure teammate is in the dropdown', async ({ page }) => {

        await page.locator('xpath=//*[@id="_r_0_"]').fill('abcxyza');

        await page.locator('text=Add').click();
        
        await page.locator('xpath=//*[@id="_r_0_"]').click();

        await expect(page.locator('text=abcxyza')).toBeVisible();
    });
});
