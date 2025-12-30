class InteractiveElementsPage {
  constructor(page) {
    this.page = page;

    // 🔗 Link (Anchor Tag)
    this.link = page.getByRole('link', { name: 'Click Me' });
    this.linkOutput = page.locator('div.output-box', { hasText: 'Click the link' });

    // 🖼️ Image
    this.image = page.locator('img[alt="Placeholder"]');
    this.imageOutput = page.locator('div.output-box', { hasText: 'Click the image' });

    // 📊 Table & Grid
    this.tableHeaderID = page.getByRole('columnheader', { name: 'ID' });
    this.tableHeaderName = page.getByRole('columnheader', { name: 'Name' });
    this.tableHeaderAge = page.getByRole('columnheader', { name: 'Age' });
    this.tableOutput = page.locator('div.output-box', { hasText: /sort/ });

    // 💬 Tooltip
    this.tooltipTrigger = page.getByText('Hover Me');
    this.tooltipOutput = page.locator('div.output-box', { hasText: /Hover over/ });

    // 🎚️ Slider
    this.slider = page.locator('input[type="range"]');
    this.sliderOutput = page.locator('div.output-box', { hasText: /Slider Value:/ });

    // 📈 Progress Bar
    this.incrementProgressButton = page.getByRole('button', { name: 'Increment Progress' });
    this.progressOutput = page.locator('div.output-box', { hasText: /Progress:/ });
  }

  async clickLink() {
    await this.link.click();
  }

  async clickImage() {
    await this.image.click();
  }

  async sortTableBy(column = 'ID') {
    const headerMap = {
      ID: this.tableHeaderID,
      Name: this.tableHeaderName,
      Age: this.tableHeaderAge,
    };
    await headerMap[column].click();
  }

  async hoverTooltip() {
    await this.tooltipTrigger.hover();
  }

  async setSlider(value) {
    await this.slider.fill(String(value));
  }

  async incrementProgress() {
    await this.incrementProgressButton.click();
  }
}

export { InteractiveElementsPage };
