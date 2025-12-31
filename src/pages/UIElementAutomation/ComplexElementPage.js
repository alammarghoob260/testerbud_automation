class ComplexElementsPage {
  constructor(page) {
    this.page = page;

    // 🪟 Modal & Popup
    this.showModalButton = page.getByRole('button', { name: 'Show Modal' });
    this.modalOutputBox = page
      .locator('.row')
      .filter({ hasText: 'Modal & Popup:' })
      .locator('.output-box');

    // 📅 Date Picker & Calendar
    this.dateInput = page.locator('input[placeholder*="YYYY-MM-DD"], input[placeholder*="Simulated"]').first();
    this.dateOutput = page
      .locator('.row')
      .filter({ hasText: 'Date Picker & Calendar:' })
      .locator('.output-box');

    // 📁 File Upload & Download
    this.fileUploadInput = page.locator('input[type="file"]');
    this.simulateDownloadButton = page.getByRole('button', { name: 'Simulate Download' });
    this.fileOutput = page
      .locator('.row')
      .filter({ hasText: 'File Upload & Download:' })
      .locator('.output-box');

    // 🖱️ Drag and Drop
    this.dragSource = page.getByText('Drag Me', { exact: true });
    this.dropTarget = page.getByText('Drop Here', { exact: true });
    this.dragDropOutput = page
      .locator('.row')
      .filter({ hasText: 'Drag and Drop Elements:' })
      .locator('.output-box');

    // 🌐 Iframe
    this.iframe = page.frameLocator('iframe[title="iframe-practice"]');
    this.iframeOutput = page
      .locator('.row')
      .filter({ hasText: 'Iframe:' })
      .locator('.output-box');
  }

  async openModal() {
    await this.showModalButton.click();
  }

  async closeModal() {
    const closeButton = this.page.locator('.modal-header .btn-close, button[aria-label="Close"]');
    if (await closeButton.first().isVisible().catch(() => false)) {
      await closeButton.first().click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(200);
  }

  async enterDate(value) {
    // Fill input but don't expect output to change (simulated UI)
    await this.dateInput.fill(value);
    await this.dateInput.press('Enter');
    await this.dateInput.blur();
  }

  async uploadFile(filePath) {
    await this.fileUploadInput.setInputFiles(filePath);
  }

  async simulateDownload() {
    await this.simulateDownloadButton.click();
  }

  async performDragAndDrop() {
    await this.dragSource.dragTo(this.dropTarget);
  }

  async verifyIframeLoaded() {
    return await this.iframe.locator('h1').isVisible();
  }
}

export { ComplexElementsPage };
