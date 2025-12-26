// src/pages/Ecommerce/ProductPage.js
import { expect } from '@playwright/test';

export class ProductPage {
  constructor(page) {
    this.page = page;

    // 🔗 Anchors / Common locators
    this.heading = page.getByRole('link', { name: /testerbud/i });
    this.searchInput = page.getByRole('searchbox', { name: /search/i });
    this.cartIcon = page.locator(
      '#root > div:nth-child(3) > nav > div > div.d-flex.align-items-center.ms-auto > button'
    );

    // 🔗 Product card base locator (all product cards)
    this.productCards = page.locator('.card'); // each product card has class="card"
  }

  // Anchors
  async isLoaded() {
    await this.heading.waitFor({ state: 'visible' }).catch(() => {});
    return await this.searchInput.isVisible();
  }

  // Product card helpers (keyword or alt-based)
  cardByName(name) {
    const card = this.productCards.filter({ hasText: name });
    return {
      root: card,
      qty: card.locator('input[type="number"]'), // scoped to this card only
      addButton: card.getByRole('button', { name: /add to cart/i }),
    };
  }

  cardByAlt(name) {
    const card = this.page.locator(`img[alt="${name}"]`).locator('..').locator('..');
    return {
      root: card,
      qty: card.locator('input[type="number"]'),
      addButton: card.getByRole('button', { name: /add to cart/i }),
    };
  }

  async setQuantityAndAdd(name, qty = 1) {
    const { qty: qtyInput, addButton } = this.cardByName(name);
    await expect(qtyInput).toBeVisible(); // ensures only the correct card is matched
    await qtyInput.scrollIntoViewIfNeeded();
    await qtyInput.fill(String(qty));
    await addButton.click();
  }

  // 🔗 Add multiple random products
  async addRandomProducts(count = 5) {
    const total = await this.productCards.count();
    const indices = Array.from({ length: count }, () => Math.floor(Math.random() * total));

    for (const i of indices) {
      const card = this.productCards.nth(i);
      const qtyInput = card.locator('input[type="number"]');
      const addButton = card.getByRole('button', { name: /add to cart/i });
      await expect(qtyInput).toBeVisible();
      await qtyInput.fill('1');
      await addButton.click();
    }
  }

  // 🔗 Fixed search (live filter, no Enter press)
  async search(term) {
    await this.searchInput.fill(term);
    // Enter press ki zarurat nahi hai, live filter ho jaata hai
  }

  async openCart() {
    await this.cartIcon.click();
  }
}
