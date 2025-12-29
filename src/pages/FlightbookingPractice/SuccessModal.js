// src/pages/FlightBooking/SuccessModal.js
import { expect } from '@playwright/test';

export class SuccessModal {
  constructor(page) {
    this.page = page;
    // Modal container
    this.modal = page
      .getByRole('dialog', { name: /booking successful/i })
      .or(page.locator('.card.shadow-lg.rounded-lg.mt-4'));

    // Heading
    this.heading = this.modal
      .getByRole('heading', { name: /booking successful/i })
      .or(this.modal.locator('h4.text-success', { hasText: 'Booking Successful!' }));

    // Total Price
    this.totalPrice = this.modal
      .getByText(/total price/i)
      .or(this.modal.locator('p', { hasText: 'Total Price:' }));

    // Payment Info
    this.paymentInfo = this.modal.getByText(/card ending/i).or(this.modal.locator('p.text-muted'));

    // Close button (optional, agar modal mein ho)
    this.closeButton = this.modal
      .getByRole('button', { name: /close|done|ok/i })
      .or(this.modal.locator('button.btn-close'));
  }

  async isOpen() {
    await expect(this.heading).toBeVisible();
    return this.heading.isVisible();
  }

  async verifySummary({ expectedTotal }) {
    if (expectedTotal) {
      await expect(this.totalPrice).toContainText(String(expectedTotal));
    }
  }

  async confirmAndClose() {
    const hasClose = await this.closeButton.count();
    if (hasClose > 0) {
      await this.closeButton.click();
    }
  }
}
