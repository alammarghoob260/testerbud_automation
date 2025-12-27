# Playwright Locator Best Practices Guide

## Overview

This guide documents the locator best practices applied to the TesterBud Automation project, following Playwright's official recommendations.

---

## 1. Locator Priority Order

### Level 1: Role-Based (Most Recommended)

These are the most resilient and maintainable locators.

```javascript
// Buttons
page.getByRole('button', { name: 'Sign in' });
page.getByRole('button', { name: /submit|save/i }); // Regex support

// Links
page.getByRole('link', { name: 'Home' });

// Radio buttons
page.getByRole('radio', { name: 'Email' });

// Checkboxes
page.getByRole('checkbox', { name: 'Remember me' });

// Textboxes
page.getByRole('textbox', { name: 'Email' });

// Dropdowns/Selects
page.getByRole('combobox', { name: 'Country' });
```

**Advantages:**

- ✅ Follows accessibility patterns
- ✅ Resilient to DOM changes
- ✅ Self-documenting code
- ✅ Helps ensure accessibility

---

### Level 2: Test Attributes

Use data-testid or similar attributes for targeting.

```javascript
// Most specific attribute selector
page.locator('[data-testid="submit-button"]');

// By name attribute (great for forms)
page.locator('input[name="firstName"]');
page.locator('select[name="country"]');

// By ID (when available)
page.locator('#formBasicEmail');

// By type
page.locator('input[type="password"]');
```

**Advantages:**

- ✅ Specific and reliable
- ✅ Not affected by styling changes
- ✅ Good for form elements

---

### Level 3: Fallback with `.or()`

Combine selectors for resilience.

```javascript
// Try primary selector, fallback to alternative
page.locator('button.btn-primary').or(page.locator('.submit-button'));

// Multiple fallbacks
page
  .locator('select[name="country"]')
  .or(page.locator('#country-dropdown'))
  .or(page.locator('.country-select'));
```

**Advantages:**

- ✅ Handles DOM variations
- ✅ Works with different app versions
- ✅ Provides flexibility

---

### Level 4: Class & ID Combinations

Use when more specific selectors aren't available.

```javascript
// Class selector
page.locator('.alert-success');

// ID selector
page.locator('#main-submit');

// Class combination
page.locator('.btn.btn-primary'); // Both classes required
```

**Advantages:**

- ✅ Simple and direct
- ✅ Works for most elements

---

## 2. What to AVOID ❌

### ❌ Long nth-child CSS Selectors

**Problem:** Brittle and fails on DOM reordering

```javascript
// DON'T DO THIS
page.locator('#root > div.py-5.container > div > div > form > div:nth-child(1) > select');
```

**Why it's bad:**

- Breaks if any parent element changes
- Breaks if form fields are reordered
- Hard to read and maintain
- Not resilient to layout changes

---

### ❌ XPath Selectors

**Problem:** Harder to maintain and less performant

```javascript
// DON'T DO THIS
page.locator('//button[contains(text(), "Sign in")]');
page.locator('//form/div[1]/input');
```

**Why it's bad:**

- Verbose and hard to read
- Slower than CSS/role selectors
- More fragile
- Less intuitive

---

### ❌ Complex CSS Combinators

**Problem:** Over-specific and breaks easily

```javascript
// DON'T DO THIS
page.locator('div.container > form > fieldset > div:nth-of-type(2) > label + input');
```

**Why it's bad:**

- Too specific
- Breaks on small DOM changes
- Hard to understand
- Unmaintainable

---

### ❌ Text-Based Selectors (Unreliable)

**Problem:** Breaks with text changes or translations

```javascript
// AVOID (if possible)
page.locator('text=Submit Button'); // Text changes break this
```

**Better Alternative:**

```javascript
// GOOD
page.getByRole('button', { name: 'Submit' }); // Accessible and flexible
```

---

## 3. Real-World Examples

### Example 1: Login Form

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;

    // ✅ GOOD: Using IDs for form controls
    this.emailInput = page.locator('#email-input');
    this.passwordInput = page.locator('#password-input');

    // ✅ GOOD: Using role selectors
    this.signInButton = page.getByRole('button', { name: /sign in|login/i });

    // ✅ GOOD: Using class selectors for simple elements
    this.welcomeMessage = page.locator('.alert-success').first();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
```

---

### Example 2: Web Form with Fallbacks

```javascript
class FormPage {
  constructor(page) {
    // ✅ GOOD: Attribute selector with fallback
    this.firstNameInput = page
      .locator('input[name="firstName"]')
      .or(page.locator('#first-name-field'));

    // ✅ GOOD: Role-based with fallback
    this.submitButton = page
      .getByRole('button', { name: /submit|save/i })
      .or(page.locator('button.submit-btn'));

    // ✅ GOOD: Select by name for dropdowns
    this.countryDropdown = page.locator('select[name="country"]');

    // ✅ GOOD: Multiple selector options
    this.successMessage = page.locator('.card-body > div, .alert, [data-testid="success"]').first();
  }
}
```

---

### Example 3: Dynamic Elements

```javascript
// ✅ GOOD: Function-based locator for dynamic content
communicationRadio = (method) => {
  return this.page.getByRole('radio', { name: new RegExp(method, 'i') });
};

// Usage
await page.communicationRadio('Email').check();
await page.communicationRadio('Phone').check();
```

---

## 4. Locator Matchers

### Common Matchers

```javascript
// Exact match
page.getByRole('button', { name: 'Login' });

// Case-insensitive regex
page.getByRole('button', { name: /sign in|login/i });

// Partial text match
page.getByText('Welcome');

// Multiple criteria
page.getByRole('textbox', { name: 'Email' });
```

---

## 5. Locator Methods

### Useful Methods

```javascript
// Wait for element
await page.locator('#email').waitFor({ state: 'visible' });

// Get count of matching elements
const count = await page.locator('.item').count();

// First/Last
page.locator('.item').first();
page.locator('.item').last();

// Nth element
page.locator('.item').nth(2);

// Filter by text
page.locator('button').filter({ hasText: 'Submit' });

// Filter by role
page.locator('div').filter({ has: page.locator('a') });

// Combine with AND
page.locator('button').and(page.locator('[type="submit"]'));

// Combine with OR
page.locator('button').or(page.locator('[role="button"]'));
```

---

## 6. Testing Locators

### Before Using in Tests

```javascript
// Test locator in browser console
const locator = page.locator('#email-input');

// Count matches
const count = await locator.count();
console.log(`Found ${count} elements`);

// Check visibility
const visible = await locator.isVisible();
console.log(`Element visible: ${visible}`);

// Get text content
const text = await locator.textContent();
console.log(`Element text: ${text}`);
```

---

## 7. Accessibility Benefits

### Good Locators Support Accessibility

```javascript
// ✅ These locators help ensure your app is accessible
page.getByRole('button'); // Requires proper <button> element
page.getByRole('link'); // Requires proper <a> element
page.getByRole('textbox'); // Requires proper form input
page.getByRole('radio'); // Requires proper radio button
page.getByRole('checkbox'); // Requires proper checkbox

// This means your app works better with screen readers too!
```

---

## 8. Maintenance Tips

### Keep Locators Flexible

```javascript
// ❌ FRAGILE
page.locator('.container > div > form > button.btn-primary');

// ✅ FLEXIBLE
page.getByRole('button', { name: 'Submit' });
```

### Use Meaningful Selectors

```javascript
// ❌ Unclear
page.locator('.a > .b > input');

// ✅ Clear
page.locator('input[name="email"]');
```

### Document Complex Selectors

```javascript
// ✅ Good documentation
// Use first alert-success, as multiple might exist on page
this.welcomeMessage = page.locator('.alert-success').first();
```

---

## 9. Debugging Locators

### Useful Debugging Commands

```javascript
// Debug locator
await page.locator('#email').screenshot({ path: 'email-field.png' });

// Highlight element
await page.locator('#email').highlight();

// Get element info
const bbox = await page.locator('#email').boundingBox();
console.log(bbox);

// Check if element matches selector
const matches = await page
  .locator('#email')
  .evaluate((el) => document.querySelectorAll('input[type="email"]').includes(el));
```

---

## 10. Quick Reference

### Locator Selection Decision Tree

```
1. Can you use role-based selectors?
   → YES: Use page.getByRole() ✅ BEST
   → NO: Continue to step 2

2. Does element have ID or unique name?
   → YES: Use page.locator('#id') or page.locator('[name="..."]') ✅ GOOD
   → NO: Continue to step 3

3. Does element have unique classes?
   → YES: Use page.locator('.unique-class') ✅ ACCEPTABLE
   → NO: Continue to step 4

4. Can you add data-testid attribute?
   → YES: Use page.locator('[data-testid="..."]') ✅ GOOD
   → NO: Continue to step 5

5. Multiple selectors available?
   → Use .or() to combine → page.locator('...').or(page.locator('...')) ✅ FLEXIBLE
   → NO: Use most specific available, add comment explaining fragility
```

---

## Summary

| Selector Type   | Priority  | Use Case            | Resilience |
| --------------- | --------- | ------------------- | ---------- |
| Role-based      | 1         | Accessible elements | ⭐⭐⭐⭐⭐ |
| Test attributes | 2         | Form inputs, custom | ⭐⭐⭐⭐⭐ |
| ID selectors    | 3         | Unique elements     | ⭐⭐⭐⭐   |
| Class selectors | 4         | Generic styling     | ⭐⭐⭐     |
| CSS complex     | 5 (avoid) | Not recommended     | ⭐         |
| nth-child       | 6 (avoid) | Not recommended     | ⭐         |
| XPath           | 7 (avoid) | Not recommended     | ⭐         |

---

**Best Practice:** Use the highest priority selector available in your app. Always prefer accessibility-first locators!
