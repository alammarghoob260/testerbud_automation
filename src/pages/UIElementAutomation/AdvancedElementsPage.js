class AdvancedElementsPage {
  constructor(page) {
    this.page = page;

  

      // Dynamic Content
this.updateContentButton = page.getByRole('button', { name: 'Update Content' });
this.dynamicContentOutputBox = page
  .locator('.row')
  .filter({ hasText: 'Dynamic Content (Simulated):' })
  .locator('.output-box')
  .nth(1);


    // Notification
    this.showNotificationButton = page.getByRole('button', { name: 'Show Notification' });
    this.notificationOutputBox = page
      .locator('.row')
      .filter({ hasText: 'Notifications & Toast Messages:' })
      .locator('.output-box');

    // 🗂️ Tabs
    this.tab1Button = page.getByRole('button', { name: 'Tab 1' });
    this.tab2Button = page.getByRole('button', { name: 'Tab 2' });
    this.tabsOutputBox = page
      .locator('.row')
      .filter({ hasText: 'Tabs:' })
      .locator('.output-box');

    // 📂 Accordion
    this.accordionItem1 = page.getByRole('button', { name: 'Accordion Item #1' });
    this.accordionItem2 = page.getByRole('button', { name: 'Accordion Item #2' });
    this.accordionOutputBox = page
      .locator('.row')
      .filter({ hasText: 'Accordion:' })
      .locator('.output-box');

    // 📜 Virtual Scrolling
    this.scrollContainer = page.locator('div.overflow-auto');
    this.virtualScrollOutputBox = page
      .locator('.row')
      .filter({ hasText: 'Virtual Scrolling (Simulated):' })
      .locator('.output-box');
  }

  async updateDynamicContent() {
    await this.updateContentButton.click();
  }

  async triggerNotification() {
    await this.showNotificationButton.click();
  }

  async switchToTab(tabName) {
    await this.page.getByRole('button', { name: tabName }).click();
  }

  async openAccordionItem(itemName) {
    await this.page.getByRole('button', { name: itemName }).click();
  }

  async scrollVirtualList() {
    try {
      // scroll the overflow container identified by class
      await this.scrollContainer.evaluate((el) => { el.scrollTop = 100; });
    } catch (e) {
      // fallback: scroll window
      await this.page.evaluate(() => window.scrollTo(0, 100));
    }
  }
}

export { AdvancedElementsPage };
