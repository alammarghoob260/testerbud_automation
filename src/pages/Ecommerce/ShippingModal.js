import { expect } from '@playwright/test';

export class ShippingModal {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('#root > div:nth-child(3) > div > div:nth-child(2) > div > div');
    this.title = page.locator(
      '#root > div:nth-child(3) > div > div:nth-child(2) > div > div > div > div > h2'
    );
    this.fullName = this.modal.getByLabel('Full name').or(this.modal.locator('#formName'));
    this.street = this.modal.getByLabel('Street address').or(this.modal.locator('#formStreet'));
    this.city = this.modal.getByLabel('City').or(this.modal.locator('#formCity'));
    this.state = this.modal.getByLabel('State').or(this.modal.locator('#formState'));
    this.zip = this.modal.getByLabel('Zip code').or(this.modal.locator('#formZip'));
    this.saveAndContinue = this.modal.getByRole('button', {
      name: /save address & continue to payment/i,
    });
  }

  async isOpen() {
    await this.modal.waitFor({ state: 'visible' });
    return this.title.isVisible();
  }

 async fillAddress(details) {
  // 👇 Scroll entire page down once (visible in headed mode)
  await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));

  // Now proceed with click + fill
  await this.fullName.click();
  await this.fullName.fill(details.fullName);

  await this.street.click();
  await this.street.fill(details.street);

  await this.city.click();
  await this.city.fill(details.city);

  await this.state.click();
  await this.state.fill(details.state);

  await this.zip.click();
  await this.zip.fill(details.zip);
}




  async continue() {
    await expect(this.saveAndContinue).toBeEnabled();
    await this.saveAndContinue.click();
  }
}
