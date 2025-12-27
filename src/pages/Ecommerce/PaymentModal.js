// src/pages/Ecommerce/PaymentModal.js
import { expect } from '@playwright/test';

export class PaymentModal {
  constructor(page) {
    this.page = page;

    // ✅ Modal container
    this.modal = page
      .locator('[data-testid="payment-modal"], .payment-modal')
      .or(page.locator('#root > div:nth-child(3) > div > div:nth-child(2) > div > div'));

    // ✅ Title
    this.title = this.modal
      .getByRole('heading', { name: /payment details/i })
      .or(
        page.locator(
          '#root > div:nth-child(3) > div > div:nth-child(2) > div > div > div > div > h2'
        )
      );

    // ✅ Payment fields with semantic locators + fallback
    this.cardNumber = this.modal.locator('//input[@id="formCardNumber" and @name="cardNumber"]');

    this.expiry = this.modal.getByLabel('Expiry date').or(this.modal.locator('#formExpiryDate'));
    this.cvv = this.modal.getByLabel('CVV').or(this.modal.locator('#formCVV'));

    // ✅ Buy Now button
    this.buyNow = this.modal
      .getByRole('button', { name: /buy now/i })
      .or(
        page.locator(
          '#root > div:nth-child(3) > div > div:nth-child(2) > div > div > div > form > button'
        )
      );
  }

  async isOpen() {
    await this.modal.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.title).toBeVisible({ timeout: 10000 });
    return true;
  }

  async fillPayment(details) {
    // ✅ Ensure modal is open before filling
    await this.isOpen();

    await expect(this.cardNumber).toBeVisible({ timeout: 10000 });
    await this.cardNumber.fill(details.cardNumber);

    await expect(this.expiry).toBeVisible({ timeout: 10000 });
    await this.expiry.fill(details.expiry);

    await expect(this.cvv).toBeVisible({ timeout: 10000 });
    await this.cvv.fill(details.cvv);
  }

  async submit() {
    await expect(this.buyNow).toBeVisible({ timeout: 10000 });
    await expect(this.buyNow).toBeEnabled();
    await this.buyNow.click();
  }
}
