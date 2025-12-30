/**
 * BasicElementsPage Page Object
 * Handles basic UI elements interactions
 */

class BasicElementsPage {
  constructor(page) {
    this.page = page;
    
    // Button Elements
    this.primaryButton = 'button.btn-primary';
    this.secondaryButton = 'button.btn-secondary';
    this.dangerButton = 'button.btn-danger';
    this.successButton = 'button.btn-success';
    
    // Text Elements
    this.headingH1 = 'h1';
    this.headingH2 = 'h2';
    this.paragraph = 'p';
    this.span = 'span';
    
    // Link Elements
    this.links = 'a';
    this.externalLink = 'a[target="_blank"]';
    
    // List Elements
    this.unorderedList = 'ul';
    this.orderedList = 'ol';
    this.listItem = 'li';
    
    // Badge Elements
    this.badge = '.badge';
    this.badgePrimary = '.badge-primary';
    this.badgeSuccess = '.badge-success';
    this.badgeDanger = '.badge-danger';
  }

  /**
   * Click primary button
   */
  async clickPrimaryButton() {
    await this.page.click(this.primaryButton);
  }

  /**
   * Click secondary button
   */
  async clickSecondaryButton() {
    await this.page.click(this.secondaryButton);
  }

  /**
   * Click danger button
   */
  async clickDangerButton() {
    await this.page.click(this.dangerButton);
  }

  /**
   * Click success button
   */
  async clickSuccessButton() {
    await this.page.click(this.successButton);
  }

  /**
   * Get heading text
   */
  async getHeadingText(level = 'h1') {
    const selector = level;
    return await this.page.textContent(selector);
  }

  /**
   * Get paragraph text
   */
  async getParagraphText(index = 0) {
    const elements = await this.page.$$(this.paragraph);
    if (elements.length > index) {
      return await elements[index].textContent();
    }
    return null;
  }

  /**
   * Click external link
   */
  async clickExternalLink() {
    await this.page.click(this.externalLink);
  }

  /**
   * Get all links count
   */
  async getLinksCount() {
    const links = await this.page.$$(this.links);
    return links.length;
  }

  /**
   * Get badge text
   */
  async getBadgeText() {
    return await this.page.textContent(this.badge);
  }

  /**
   * Get primary badge text
   */
  async getPrimaryBadgeText() {
    return await this.page.textContent(this.badgePrimary);
  }

  /**
   * Check if button is visible
   */
  async isButtonVisible(buttonType = 'primary') {
    const selector = `button.btn-${buttonType}`;
    return await this.page.isVisible(selector);
  }

  /**
   * Check if heading is visible
   */
  async isHeadingVisible(level = 'h1') {
    return await this.page.isVisible(level);
  }
}

module.exports = BasicElementsPage;
