class ComplexElementsPage {
  constructor(page) {
    this.page = page;

    // 🪟 Modal & Popup
    this.showModalButton = page.getByRole('button', { name: 'Show Modal' });
    this.modalOutputBox = page.locator('div.output-box').filter({ hasText: 'Modal is open' });

    // 📅 Date Picker & Calendar
    this.dateInput = page.getByPlaceholder('YYYY-MM-DD (Simulated)');
    this.dateOutput = page.locator('div.output-box').filter({ hasText: 'Date selected' });

    // 📁 File Upload & Download
    this.fileUploadInput = page.locator('input[type="file"]');
    this.simulateDownloadButton = page.getByRole('button', { name: 'Simulate Download' });
    this.fileOutput = page.locator('div.output-box').filter({ hasText: 'No file selected' });

    // 🖱️ Drag and Drop
    this.dragSource = page.getByText('Drag Me');
    this.dropTarget = page.getByText('Drop Here');
    this.dragDropOutput = page.locator('div.output-box').filter({
      hasText: 'Drag "Drag Me" to "Drop Here"',
    });

    // 🌐 Iframe
    this.iframe = page.frameLocator('iframe[title="iframe-practice"]');
    this.iframeOutput = page.locator('div.output-box').filter({ hasText: 'Iframe loaded' });
  }

  async openModal() {
    await this.showModalButton.click();
  }

  async closeModal() {
    // Close modal by clicking the close button (X) or clicking outside
    const closeButton = this.page.locator('.modal-header .btn-close, button[aria-label="Close"]').first();
    if (await closeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await closeButton.click();
    } else {
      // Press Escape to close modal
      await this.page.press('Escape');
    }
  }

  async enterDate(value) {
    await this.dateInput.fill(value);
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
    return await this.iframe.locator('h1').isVisible(); // Example Domain heading
  }
}

export { ComplexElementsPage };
