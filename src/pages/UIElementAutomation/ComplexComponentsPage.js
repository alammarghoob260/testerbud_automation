/**
 * ComplexComponentsPage Page Object
 * Handles complex component interactions
 */

class ComplexComponentsPage {
  constructor(page) {
    this.page = page;
    
    // Table Elements
    this.table = 'table';
    this.tableHeader = 'thead';
    this.tableBody = 'tbody';
    this.tableRow = 'tbody tr';
    this.tableCell = 'td';
    this.tableHeaderCell = 'th';
    this.sortButton = 'button.sort';
    
    // Pagination
    this.pagination = '.pagination';
    this.paginationItem = '.page-item';
    this.paginationLink = '.page-link';
    this.nextButton = '.pagination .next';
    this.prevButton = '.pagination .prev';
    
    // Data Table
    this.dataTable = '.datatable, [role="grid"]';
    this.dataTableRow = '[role="row"]';
    this.dataTableCell = '[role="gridcell"]';
    
    // Card Elements
    this.card = '.card';
    this.cardHeader = '.card-header';
    this.cardBody = '.card-body';
    this.cardFooter = '.card-footer';
    this.cardTitle = '.card-title';
    this.cardImage = '.card-img';
    
    // Carousel Elements
    this.carousel = '.carousel';
    this.carouselItem = '.carousel-item';
    this.carouselControl = '.carousel-control';
    this.nextSlide = '.carousel-control.next';
    this.prevSlide = '.carousel-control.prev';
    
    // Accordion
    this.accordion = '.accordion';
    this.accordionItem = '.accordion-item';
    this.accordionButton = '.accordion-button';
    this.accordionCollapse = '.accordion-collapse';
    
    // List Group
    this.listGroup = '.list-group';
    this.listGroupItem = '.list-group-item';
  }

  /**
   * Get table row count
   */
  async getTableRowCount() {
    const rows = await this.page.$$(this.tableRow);
    return rows.length;
  }

  /**
   * Get table cell value
   */
  async getTableCellValue(rowIndex, colIndex) {
    const rows = await this.page.$$(this.tableRow);
    if (rows.length > rowIndex) {
      const cells = await rows[rowIndex].$$eval(this.tableCell, cells => 
        cells.map(cell => cell.textContent)
      );
      return cells[colIndex] || null;
    }
    return null;
  }

  /**
   * Click table row
   */
  async clickTableRow(rowIndex) {
    const rows = await this.page.$$(this.tableRow);
    if (rows.length > rowIndex) {
      await rows[rowIndex].click();
    }
  }

  /**
   * Sort table by column
   */
  async sortTableByColumn(columnIndex) {
    const headers = await this.page.$$(this.tableHeaderCell);
    if (headers.length > columnIndex) {
      await headers[columnIndex].click();
    }
  }

  /**
   * Go to next page
   */
  async goToNextPage() {
    await this.page.click(this.nextButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Go to previous page
   */
  async goToPreviousPage() {
    await this.page.click(this.prevButton);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click pagination page
   */
  async clickPaginationPage(pageNumber) {
    const pages = await this.page.$$(this.paginationLink);
    for (const page of pages) {
      const text = await page.textContent();
      if (text.trim() === pageNumber.toString()) {
        await page.click();
        await this.page.waitForLoadState('networkidle');
        break;
      }
    }
  }

  /**
   * Get card count
   */
  async getCardCount() {
    const cards = await this.page.$$(this.card);
    return cards.length;
  }

  /**
   * Get card title
   */
  async getCardTitle(cardIndex) {
    const cards = await this.page.$$(this.card);
    if (cards.length > cardIndex) {
      const title = await cards[cardIndex].$(this.cardTitle);
      return await title.textContent();
    }
    return null;
  }

  /**
   * Click card
   */
  async clickCard(cardIndex) {
    const cards = await this.page.$$(this.card);
    if (cards.length > cardIndex) {
      await cards[cardIndex].click();
    }
  }

  /**
   * Go to next carousel slide
   */
  async goToNextSlide() {
    await this.page.click(this.nextSlide);
  }

  /**
   * Go to previous carousel slide
   */
  async goToPreviousSlide() {
    await this.page.click(this.prevSlide);
  }

  /**
   * Get active carousel item
   */
  async getActiveCarouselItem() {
    return await this.page.textContent('.carousel-item.active');
  }

  /**
   * Click accordion button
   */
  async clickAccordionButton(index) {
    const buttons = await this.page.$$(this.accordionButton);
    if (buttons.length > index) {
      await buttons[index].click();
    }
  }

  /**
   * Check if accordion item is expanded
   */
  async isAccordionItemExpanded(index) {
    const collapses = await this.page.$$(this.accordionCollapse);
    if (collapses.length > index) {
      const classList = await collapses[index].getAttribute('class');
      return classList.includes('show');
    }
    return false;
  }

  /**
   * Get list group item count
   */
  async getListGroupItemCount() {
    const items = await this.page.$$(this.listGroupItem);
    return items.length;
  }

  /**
   * Click list group item
   */
  async clickListGroupItem(index) {
    const items = await this.page.$$(this.listGroupItem);
    if (items.length > index) {
      await items[index].click();
    }
  }

  /**
   * Get list group item text
   */
  async getListGroupItemText(index) {
    const items = await this.page.$$(this.listGroupItem);
    if (items.length > index) {
      return await items[index].textContent();
    }
    return null;
  }
}

module.exports = ComplexComponentsPage;
