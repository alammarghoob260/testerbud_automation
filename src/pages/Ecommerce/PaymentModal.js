// src/pages/Ecommerce/PaymentModal.js
export class PaymentModal {
  constructor(page) {
    this.page = page;
    this.modal = page
      .locator('[data-testid="payment-modal"], .payment-modal')
      .or(page.locator('#root > div:nth-child(3) > div > div:nth-child(2) > div > div'));
    this.title = this.modal
      .getByRole('heading', { name: /payment details/i })
      .or(
        page.locator(
          '#root > div:nth-child(3) > div > div:nth-child(2) > div > div > div > div > h2'
        )
      );
    this.cardNumber = this.modal
      .getByLabel('Card number')
      .or(this.modal.locator('#formCardNumber'));
    this.expiry = this.modal.getByLabel('Expiry date').or(this.modal.locator('#formExpiryDate'));
    this.cvv = this.modal.getByLabel('CVV').or(this.modal.locator('#formCVV'));
    this.buyNow = this.modal
      .getByRole('button', { name: /buy now/i })
      .or(
        page.locator(
          '#root > div:nth-child(3) > div > div:nth-child(2) > div > div > div > form > button'
        )
      );
  }

  async isOpen() {
    await this.modal.waitFor({ state: 'visible' });
    return this.title.isVisible();
  }

  async fillPayment(details) {
    await this.cardNumber.fill(details.cardNumber);
    await this.expiry.fill(details.expiry);
    await this.cvv.fill(details.cvv);
  }

  async submit() {
    await this.buyNow.click();
  }
}
