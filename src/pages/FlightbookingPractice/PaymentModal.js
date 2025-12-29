// src/pages/FlightBooking/PaymentModal.js
import { expect } from '@playwright/test';

export class PaymentModal {
  constructor(page) {
    this.page = page;
    // Try to find any modal/dialog on the page
    this.modal = page.locator('[role="dialog"], .modal, .payment-modal');

    // Heading - try multiple selectors
    this.heading = this.modal
      .getByRole('heading', { name: /payment|book/i })
      .or(this.modal.locator('h4, h3, h2, .modal-title'))
      .first();

    // Close button
    this.closeButton = this.modal
      .getByRole('button', { name: /close/i })
      .or(this.modal.locator('.btn-close'));

    // Flight summary (departure)
    this.departureSummary = this.modal
      .getByRole('heading', { name: /departure|outbound/i })
      .or(this.modal.locator('h5, h6'));

    // Flight summary (return)
    this.returnSummary = this.modal
      .getByRole('heading', { name: /return|inbound/i })
      .or(this.modal.locator('h5, h6'));

    // Card fields - try multiple selectors
    this.cardNumber = this.modal
      .getByLabel(/card|number/i)
      .or(this.modal.locator('#cardNumber, [name="cardNumber"], [placeholder*="card"]'))
      .first();

    this.expiry = this.modal
      .getByLabel(/expiry|date/i)
      .or(this.modal.locator('#expiryDate, #expiry, [name="expiry"], [placeholder*="expiry"]'))
      .first();

    this.cvv = this.modal
      .getByLabel(/cvv|cvc/i)
      .or(this.modal.locator('#cvv, [name="cvv"], [placeholder*="cvv"]'))
      .first();

    // Book Flight button
    this.bookButton = this.modal
      .getByRole('button', { name: /book|confirm|pay|submit/i })
      .or(this.modal.locator('button.btn-success, button[type="submit"]'))
      .first();
  }

  async isOpen() {
    // Check if modal is visible
    const isVisible = await this.modal.isVisible().catch(() => false);
    if (isVisible) {
      return true;
    }
    throw new Error('Payment modal is not visible');
  }

  async fillPayment(payment) {
    await this.cardNumber.fill(payment.cardNumber);
    await this.expiry.fill(payment.expiry);
    await this.cvv.fill(payment.cvv);
  }

  async submit() {
    await expect(this.bookButton).toBeEnabled();
    await this.bookButton.click();
  }
}
