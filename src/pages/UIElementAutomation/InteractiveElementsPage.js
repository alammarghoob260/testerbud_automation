class InteractiveElementsPage {
  constructor(page) {
    this.page = page;

    // 🔗 Link (Anchor Tag)
    this.link = page.getByRole('link', { name: 'Click Me' });
    this.linkOutput = page
      .locator('.row')
      .filter({ has: page.getByText('Link (Anchor Tag):') })
      .locator('.output-box');

    // 🖼️ Image
    this.image = page.locator('img[alt="Placeholder"]');
    this.imageOutput = page
      .locator('.row')
      .filter({ has: page.getByText('Image:') })
      .locator('.output-box');

    // 📊 Table & Grid
    this.tableHeaderID = page.getByRole('columnheader', { name: 'ID' });
    this.tableHeaderName = page.getByRole('columnheader', { name: 'Name' });
    this.tableHeaderAge = page.getByRole('columnheader', { name: 'Age' });
    this.tableOutput = page
      .locator('.row')
      .filter({ has: page.getByText('Table & Grid:') })
      .locator('.output-box');

    // 💬 Tooltip
    this.tooltipTrigger = page.locator('(//span[normalize-space(text())="Hover Me"])[1]');
    this.tooltipOutput = page
      .locator('.row')
      .filter({ has: page.getByText('Tooltip:') })
      .locator('.output-box');

    // 🎚️ Slider
    this.slider = page.locator('input[type="range"]');
    this.sliderOutput = page
      .locator('.row')
      .filter({ has: page.getByText('Slider:') })
      .locator('.output-box');

    // 📈 Progress Bar
    this.incrementProgressButton = page.getByRole('button', { name: 'Increment Progress' });
    this.progressOutput = page
      .locator('.row')
      .filter({ has: page.getByText('Progress Bar:') })
      .locator('.output-box');
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
