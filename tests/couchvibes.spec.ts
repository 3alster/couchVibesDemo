import { test, expect } from '@playwright/test';

test('beta couchvibes login and join event', async ({ page },testInfo) => {
    await page.goto('https://beta.couchvibes.com/');
    await expect(page).toHaveURL('https://beta.couchvibes.com/public/page');
    await page.getByRole('button', { name: 'Log in' }).click();
    //await page.getByPlaceholder('Email Address').click();
    await page.getByPlaceholder('Email Address').fill(process.env.C_EMAIL);
    //await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(process.env.C_PASS);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('.head-img').first().click();
    await expect(page.getByRole('button', { name: 'Join Event' })).toBeVisible();
    await testInfo.attach('beforeJoin', { body: await page.screenshot(), contentType: 'image/png' });
    await page.getByRole('button', { name: 'Join Event' }).click();
    await expect(page.getByText('Live Now')).toBeVisible();
    await expect(page.getByText('Danyo\'s room, Dennis Waberowski from Berlin, Deutschland')).toBeVisible();
    //await expect(page.getByText('hihihi')).toBeVisible();
    await page.waitForTimeout(10000);
    await testInfo.attach('beforeExit', { body: await page.screenshot(), contentType: 'image/png' });
    await page.locator('.head-right > button:nth-child(3)').click();
    await page.getByRole('button', { name: 'Exit Stream' }).click();
});