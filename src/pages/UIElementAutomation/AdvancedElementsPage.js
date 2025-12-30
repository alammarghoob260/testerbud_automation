/**
 * AdvancedElementsPage Page Object
 * Handles advanced UI elements interactions
 */

class AdvancedElementsPage {
  constructor(page) {
    this.page = page;
    
    // Alert/Modal Elements
    this.modal = '.modal';
    this.modalDialog = '.modal-dialog';
    this.modalTitle = '.modal-title';
    this.modalBody = '.modal-body';
    this.modalFooter = '.modal-footer';
    this.closeButton = 'button.close, button[aria-label="Close"]';
    this.confirmButton = 'button.btn-primary.modal-confirm';
    
    // Popover Elements
    this.popover = '.popover';
    this.popoverContent = '.popover-body';
    this.popoverTrigger = '[data-toggle="popover"]';
    
    // Tooltip Elements
    this.tooltip = '.tooltip';
    this.tooltipContent = '.tooltip-inner';
    this.tooltipTrigger = '[data-toggle="tooltip"]';
    
    // Dropdown Elements
    this.dropdownMenu = '.dropdown-menu';
    this.dropdownToggle = '.dropdown-toggle';
    this.dropdownItem = '.dropdown-item';
    
    // Alert Elements
    this.alert = '.alert';
    this.alertSuccess = '.alert-success';
    this.alertDanger = '.alert-danger';
    this.alertWarning = '.alert-warning';
    this.alertInfo = '.alert-info';
    this.alertClose = '.alert .close';
    
    // Progress Bar
    this.progressBar = '.progress-bar';
    this.progressContainer = '.progress';
    
    // Spinner/Loader
    this.spinner = '.spinner, .loader';
    this.spinnerBorder = '.spinner-border';
    
    // Tabs
    this.tabNav = '.nav-tabs';
    this.tabLink = '.nav-link';
    this.tabContent = '.tab-content';
    this.tabPane = '.tab-pane';
  }

  /**
   * Check if modal is visible
   */
  async isModalVisible() {
    return await this.page.isVisible(this.modal);
  }

  /**
   * Get modal title
   */
  async getModalTitle() {
    return await this.page.textContent(this.modalTitle);
  }

  /**
   * Get modal body text
   */
  async getModalBodyText() {
    return await this.page.textContent(this.modalBody);
  }

  /**
   * Close modal
   */
  async closeModal() {
    await this.page.click(this.closeButton);
    await this.page.waitForSelector(this.modal, { state: 'hidden' });
  }

  /**
   * Confirm modal action
   */
  async confirmModal() {
    await this.page.click(this.confirmButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Hover over popover trigger
   */
  async hoverPopover() {
    await this.page.hover(this.popoverTrigger);
    await this.page.waitForSelector(this.popover, { state: 'visible' });
  }

  /**
   * Get popover content
   */
  async getPopoverContent() {
    return await this.page.textContent(this.popoverContent);
  }

  /**
   * Hover over tooltip trigger
   */
  async hoverTooltip() {
    await this.page.hover(this.tooltipTrigger);
    await this.page.waitForSelector(this.tooltip, { state: 'visible' });
  }

  /**
   * Get tooltip content
   */
  async getTooltipContent() {
    return await this.page.textContent(this.tooltipContent);
  }

  /**
   * Click dropdown toggle
   */
  async clickDropdown() {
    await this.page.click(this.dropdownToggle);
  }

  /**
   * Click dropdown item
   */
  async clickDropdownItem(itemText) {
    const items = await this.page.$$(this.dropdownItem);
    for (const item of items) {
      const text = await item.textContent();
      if (text.includes(itemText)) {
        await item.click();
        break;
      }
    }
  }

  /**
   * Check if alert is visible
   */
  async isAlertVisible(alertType = '') {
    const selector = alertType ? `.alert-${alertType}` : this.alert;
    return await this.page.isVisible(selector);
  }

  /**
   * Get alert text
   */
  async getAlertText(alertType = '') {
    const selector = alertType ? `.alert-${alertType}` : this.alert;
    return await this.page.textContent(selector);
  }

  /**
   * Close alert
   */
  async closeAlert() {
    await this.page.click(this.alertClose);
  }

  /**
   * Get progress value
   */
  async getProgressValue() {
    const ariaValueNow = await this.page.getAttribute(this.progressBar, 'aria-valuenow');
    return ariaValueNow ? parseInt(ariaValueNow) : null;
  }

  /**
   * Check if spinner is visible
   */
  async isSpinnerVisible() {
    return await this.page.isVisible(this.spinner);
  }

  /**
   * Wait for spinner to disappear
   */
  async waitForSpinnerToDisappear() {
    await this.page.waitForSelector(this.spinner, { state: 'hidden' });
  }

  /**
   * Click tab
   */
  async clickTab(tabIndex) {
    const tabs = await this.page.$$(this.tabLink);
    if (tabs.length > tabIndex) {
      await tabs[tabIndex].click();
    }
  }

  /**
   * Get active tab content
   */
  async getActiveTabContent() {
    const activePane = await this.page.$('.tab-pane.active');
    return await activePane.textContent();
  }
}

module.exports = AdvancedElementsPage;
