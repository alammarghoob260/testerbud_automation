// fixtures/homeFixture.js
import { test as base } from '@playwright/test';
import { homePageUrl } from '../utils/testData';

const test = base.extend({
  practiceSitePage: async ({ page }, use) => {
    // Navigate to homepage
    await page.goto(homePageUrl);
    await page.waitForLoadState('domcontentloaded');

    // Store locators in variables
    const practiceSiteDropdown = page.locator('#practice-sites-dropdown > span');
    const practiceSiteOptions = page.locator('#testerbud-navbar > div > div > div > a');

    // Actions
    await practiceSiteDropdown.click();
    await practiceSiteOptions.nth(0).click(); // default first option

    // Pass page to test
    await use(page);
  },
});

export { test };
