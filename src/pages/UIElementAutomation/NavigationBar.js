/**
 * NavigationBar Page Object
 * Handles navigation bar interactions and elements
 */

class NavigationBar {
  constructor(page) {
    this.page = page;
    
    // Navigation Bar Selectors
    this.homeLink = 'a[href="/"]';
    this.aboutLink = 'a[href="/about"]';
    this.contactLink = 'a[href="/contact"]';
    this.servicesLink = 'a[href="/services"]';
    this.productsLink = 'a[href="/products"]';
    this.searchButton = 'button[aria-label="Search"]';
    this.userMenuButton = 'button[aria-label="User Menu"]';
    this.mobileMenuButton = 'button[aria-label="Menu"]';
  }

  /**
   * Navigate to home page
   */
  async goToHome() {
    await this.page.click(this.homeLink);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to about page
   */
  async goToAbout() {
    await this.page.click(this.aboutLink);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to contact page
   */
  async goToContact() {
    await this.page.click(this.contactLink);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to services page
   */
  async goToServices() {
    await this.page.click(this.servicesLink);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to products page
   */
  async goToProducts() {
    await this.page.click(this.productsLink);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click search button
   */
  async clickSearch() {
    await this.page.click(this.searchButton);
  }

  /**
   * Click user menu button
   */
  async clickUserMenu() {
    await this.page.click(this.userMenuButton);
  }

  /**
   * Toggle mobile menu
   */
  async toggleMobileMenu() {
    await this.page.click(this.mobileMenuButton);
  }

  /**
   * Check if navigation bar is visible
   */
  async isNavigationBarVisible() {
    return await this.page.isVisible('nav');
  }
}

module.exports = NavigationBar;
