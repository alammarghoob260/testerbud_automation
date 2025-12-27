/**
 * RetryHelper - Retry logic for flaky operations
 * Handles network issues, flaky UI elements, and transient failures
 * @example
 * // Retry a function
 * const result = await RetryHelper.retry(async () => {
 *   return await element.click();
 * }, 3, 1000);
 *
 * // Retry element interaction
 * await RetryHelper.retryElement(element, async (el) => el.fill('value'), 3);
 */

import { Logger } from './Logger.js';

class RetryHelper {
  /**
   * Retry an async function with exponential backoff
   * @param {Function} asyncFn - Async function to retry
   * @param {number} maxAttempts - Maximum number of attempts (default: 3)
   * @param {number} delayMs - Initial delay in milliseconds (default: 1000)
   * @returns {Promise} Result of the async function
   * @throws {Error} If all attempts fail
   * @example
   * await RetryHelper.retry(async () => {
   *   const response = await fetch(url);
   *   return response.json();
   * }, 3, 500);
   */
  static async retry(asyncFn, maxAttempts = 3, delayMs = 1000) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        Logger.debug(`Attempt ${attempt}/${maxAttempts}: Executing operation`);
        const result = await asyncFn();
        Logger.success(`✓ Operation succeeded on attempt ${attempt}`);
        return result;
      } catch (error) {
        lastError = error;
        Logger.warn(`✗ Attempt ${attempt} failed: ${error.message}`);

        if (attempt < maxAttempts) {
          const waitTime = delayMs * Math.pow(2, attempt - 1); // Exponential backoff
          Logger.info(`Retrying in ${waitTime}ms... (${maxAttempts - attempt} retries left)`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
    }

    Logger.error(`✗ Operation failed after ${maxAttempts} attempts`);
    throw new Error(
      `Failed after ${maxAttempts} attempts: ${lastError?.message || 'Unknown error'}`
    );
  }

  /**
   * Retry element interaction with visibility check
   * @param {Locator} element - Playwright locator element
   * @param {Function} action - Async action to perform on element (el) => {...}
   * @param {number} maxAttempts - Maximum number of attempts (default: 3)
   * @param {number} timeout - Timeout in ms to wait for element visibility (default: 5000)
   * @returns {Promise} Result of the action
   * @example
   * await RetryHelper.retryElement(
   *   loginPage.emailInput,
   *   async (el) => el.fill('user@example.com'),
   *   3
   * );
   */
  static async retryElement(element, action, maxAttempts = 3, timeout = 5000) {
    return this.retry(
      async () => {
        try {
          await element.waitFor({ state: 'visible', timeout });
        } catch (error) {
          Logger.warn(`Element not visible within ${timeout}ms`);
          throw error;
        }
        return await action(element);
      },
      maxAttempts,
      500 // Shorter initial delay for UI elements
    );
  }

  /**
   * Retry click operation with optional navigation wait
   * @param {Locator} element - Element to click
   * @param {Page} page - Playwright page object (optional, for navigation wait)
   * @param {number} maxAttempts - Maximum attempts (default: 3)
   * @returns {Promise}
   * @example
   * await RetryHelper.retryClick(submitButton, page, 3);
   */
  static async retryClick(element, page = null, maxAttempts = 3) {
    return this.retry(
      async () => {
        if (page) {
          // Wait for navigation if page provided
          const [, clickResult] = await Promise.all([
            page.waitForLoadState('domcontentloaded').catch(() => null),
            element.click(),
          ]);
          return clickResult;
        } else {
          return await element.click();
        }
      },
      maxAttempts,
      500
    );
  }

  /**
   * Retry select option on dropdown
   * @param {Locator} dropdown - Dropdown element
   * @param {Object} option - Option to select { label: 'text' } or { value: 'value' }
   * @param {number} maxAttempts - Maximum attempts (default: 3)
   * @returns {Promise}
   * @example
   * await RetryHelper.retrySelect(
   *   countryDropdown,
   *   { label: 'India' },
   *   3
   * );
   */
  static async retrySelect(dropdown, option, maxAttempts = 3) {
    return this.retry(
      async () => {
        await dropdown.waitFor({ state: 'visible', timeout: 5000 });
        return await dropdown.selectOption(option);
      },
      maxAttempts,
      500
    );
  }

  /**
   * Retry fill operation with verification
   * @param {Locator} element - Input element to fill
   * @param {string} value - Value to fill
   * @param {number} maxAttempts - Maximum attempts (default: 3)
   * @returns {Promise}
   * @example
   * await RetryHelper.retryFill(emailInput, 'user@example.com', 3);
   */
  static async retryFill(element, value, maxAttempts = 3) {
    return this.retry(
      async () => {
        await element.waitFor({ state: 'visible', timeout: 5000 });
        await element.clear();
        await element.fill(value);

        // Verify filled value matches
        const filledValue = await element.inputValue();
        if (filledValue !== value) {
          throw new Error(`Fill verification failed: expected "${value}", got "${filledValue}"`);
        }
        return filledValue;
      },
      maxAttempts,
      500
    );
  }

  /**
   * Retry element visibility check
   * @param {Locator} element - Element to check
   * @param {number} maxAttempts - Maximum attempts (default: 3)
   * @param {number} timeout - Timeout per attempt in ms (default: 5000)
   * @returns {Promise<boolean>} True if element becomes visible
   * @example
   * const isVisible = await RetryHelper.retryWaitFor(successMessage, 3);
   */
  static async retryWaitFor(element, maxAttempts = 3, timeout = 5000) {
    return this.retry(
      async () => {
        await element.waitFor({ state: 'visible', timeout });
        return true;
      },
      maxAttempts,
      500
    ).catch(() => false);
  }

  /**
   * Retry navigation with optional wait selector
   * @param {Page} page - Playwright page object
   * @param {string} url - URL to navigate to
   * @param {string} waitForSelector - Optional selector to wait for after navigation
   * @param {number} maxAttempts - Maximum attempts (default: 3)
   * @returns {Promise}
   * @example
   * await RetryHelper.retryNavigate(page, 'https://example.com', '.main-content', 3);
   */
  static async retryNavigate(page, url, waitForSelector = null, maxAttempts = 3) {
    return this.retry(
      async () => {
        Logger.info(`Navigating to ${url}`);
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        if (waitForSelector) {
          Logger.debug(`Waiting for selector: ${waitForSelector}`);
          await page.locator(waitForSelector).waitFor({ state: 'visible', timeout: 5000 });
        }

        return true;
      },
      maxAttempts,
      1000
    );
  }
}

export { RetryHelper };
