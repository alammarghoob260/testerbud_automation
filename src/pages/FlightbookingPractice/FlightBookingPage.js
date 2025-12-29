// src/pages/FlightBooking/FlightBookingPage.js
import { expect } from '@playwright/test';

export class FlightBookingPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', {
      name: /testerbud: dummy flight booking application/i,
    });

    this.from = page.locator('#from');
    this.to = page.locator('#to');
    this.departureDate = page.locator('#departureDate');
    this.returnDate = page.locator('#returnDate');
    this.passengers = page.locator('#passengers');
    this.travelClass = page.locator('#travelClass');
    this.oneWay = page.locator('#oneWay');
    this.searchButton = page.getByRole('button', { name: 'Search Flights' });
  }

  async isLoaded() {
    await expect(this.heading).toBeVisible();
    return this.heading.isVisible();
  }

  async fillForm(form) {
    await this.from.selectOption({ label: form.from });
    await this.to.selectOption({ label: form.to });
    await this.departureDate.fill(form.departureDate);
    if (!form.oneWay) {
      await this.returnDate.fill(form.returnDate);
    }
    await this.passengers.fill(String(form.passengers));
    await this.travelClass.selectOption({ label: form.travelClass });
    if (form.oneWay) {
      const checked = await this.oneWay.isChecked();
      if (!checked) await this.oneWay.check();
    } else {
      const checked = await this.oneWay.isChecked();
      if (checked) await this.oneWay.uncheck();
    }
  }

  async submit() {
    await expect(this.searchButton).toBeEnabled();
    await this.searchButton.click();
  }
}
