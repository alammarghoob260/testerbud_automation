// src/pages/Ecommerce/CartModal.js
import { expect } from '@playwright/test';

export class CartModal {
  constructor(page) {
    this.page = page;

    // 🔗 Base modal locators
    this.modal = page.locator('body > div.offcanvas.offcanvas-end.show');
    this.title = this.modal.getByText(/your cart/i);
    this.proceedButton = this.modal.getByRole('button', { name: /proceed to buy/i });

    // 🔗 Cart item base locator (all rows)
    this.cartItems = this.modal.locator('div.mb-3.list-group.list-group-flush > div');
  }

  async isOpen() {
    await this.modal.waitFor({ state: 'visible' });
    return this.title.isVisible();
  }

  // Row helpers
  rowByName(name) {
    const row = this.cartItems.filter({ hasText: name });
    return {
      root: row,
      removeButton: row.getByRole('button', { name: /remove/i }),
      subtotal: row.locator('div.fw-bold'),
    };
  }

  row(index = 0) {
    const row = this.cartItems.nth(index);
    return {
      root: row,
      removeButton: row.getByRole('button', { name: /remove/i }),
      subtotal: row.locator('div.fw-bold'),
    };
  }

  // 🔗 Remove product by name (fix for spec)
  async removeProduct(name) {
    const { removeButton } = this.rowByName(name);
    await expect(removeButton).toBeVisible();
    await removeButton.click();
  }

  // 🔗 Remove first available product (no name filter)
  async removeFirstProduct() {
    const { removeButton } = this.row(0);
    await removeButton.click();
  }

  // 🔗 Remove product by index (flexible)
  async removeProductAt(index) {
    const { removeButton } = this.row(index);
    await removeButton.click();
  }

  async confirmSubtotalAt(index, expectedSubtotal) {
    const { subtotal } = this.row(index);
    await expect(subtotal).toContainText(expectedSubtotal);
  }

  async proceedToBuy() {
    await this.proceedButton.click();
  }
}
