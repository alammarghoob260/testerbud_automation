// src/pages/Ecommerce/SuccessModal.js
import { expect } from '@playwright/test';

export class SuccessModal {
  constructor(page) {
    this.page = page;

    // Success section container: scope by heading text
    this.section = page.locator('div').filter({
      has: page.getByRole('heading', { name: /order successful/i }),
    });

    this.title = this.section.getByRole('heading', { name: /order successful/i });
    this.message = this.section.locator('p'); // first paragraph under section
    this.doneButton = this.section.getByRole('button', { name: /done/i });
  }

  async isOpen() {
    await this.title.waitFor({ state: 'visible' });
    return this.title.isVisible();
  }

  async confirmAndClose() {
    await expect(this.doneButton).toBeVisible();
    await this.doneButton.click();
  }
}
