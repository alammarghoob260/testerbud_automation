// src/pages/FlightBooking/FlightTable.js
import { expect } from '@playwright/test';

export class FlightTable {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Available Flights' });
  }

  async isLoaded() {
    await expect(this.heading).toBeVisible();
    return this.heading.isVisible();
  }

  async selectDeparture(index = 0) {
    // Try multiple selectors to find flight items
    let flights = this.page.locator('[data-testid="flight-item"]');
    let count = await flights.count();
    
    if (count === 0) {
      // Try alternative selectors
      flights = this.page.locator('.flight-item, [class*="flight"], tr[data-testid], .flight-card');
      count = await flights.count();
    }

    if (count === 0) {
      // Last resort - get all buttons and filter
      const allButtons = await this.page.getByRole('button', { name: /select|book|choose|reserve|departure/i }).all();
      if (allButtons.length === 0) {
        throw new Error('No flight selection buttons found on the page');
      }
      await allButtons[index]?.click();
      return;
    }
    
    if (index >= count) {
      throw new Error(`Flight index ${index} out of range. Only ${count} flights available.`);
    }

    const flight = flights.nth(index);
    await expect(flight).toBeVisible({ timeout: 10000 });
    
    // Click the select/book button for this flight
    const selectButton = flight.getByRole('button', { name: /select|choose|book|reserve/i });
    await selectButton.click();
  }

  async selectReturn(index = 0) {
    // Try multiple selectors to find flight items
    let flights = this.page.locator('[data-testid="flight-item"]');
    let count = await flights.count();
    
    if (count === 0) {
      // Try alternative selectors
      flights = this.page.locator('.flight-item, [class*="flight"], tr[data-testid], .flight-card');
      count = await flights.count();
    }

    if (count === 0) {
      // Last resort - get all buttons and filter
      const allButtons = await this.page.getByRole('button', { name: /select|book|choose|reserve|return/i }).all();
      if (allButtons.length === 0) {
        throw new Error('No flight selection buttons found on the page');
      }
      await allButtons[index]?.click();
      return;
    }
    
    if (index >= count) {
      throw new Error(`Flight index ${index} out of range. Only ${count} flights available.`);
    }

    const flight = flights.nth(index);
    await expect(flight).toBeVisible({ timeout: 10000 });
    
    // Click the select/book button for this flight
    const selectButton = flight.getByRole('button', { name: /select|choose|book|reserve/i });
    await selectButton.click();
  }
}
