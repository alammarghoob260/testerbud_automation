class ExplorePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByRole('heading', { name: 'Explore and Automate UI Elements' });
  }

  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ state: 'visible', timeout: 10000 });
    return await this.pageTitle.isVisible();
  }

  // ✅ Scroll down by pixels
  async scrollDown(pixels = 500) {
    await this.page.evaluate((y) => window.scrollBy(0, y), pixels);
  }

  // ✅ Scroll directly to a section heading
  async scrollToSection(sectionName) {
    const sectionHeading = this.page.getByRole('heading', { name: sectionName });
    await sectionHeading.scrollIntoViewIfNeeded();
  }
}

export { ExplorePage };
