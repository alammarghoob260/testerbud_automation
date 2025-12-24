# TesterBud Automation Framework

A comprehensive Playwright-based test automation framework for testing TesterBud practice sites with structured page objects, logging, and data validation.

## Features

✨ **Page Object Model (POM)** - Maintainable and scalable test structure
🔍 **Comprehensive Logging** - Color-coded logs with timestamps for easy debugging
✅ **Data Validation** - Built-in validation utilities for test data
📊 **Multi-Browser Support** - Tests run on Chromium, Firefox, and WebKit
📈 **HTML Reporting** - Detailed test reports with screenshots and videos
🛠️ **Developer Tools** - ESLint, Prettier integration for code quality

## Installation

```bash
npm install
```

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

```
EMAIL=your-email@example.com
PASSWORD=your-password
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in UI mode (interactive)

```bash
npm run test:ui
```

### Run tests in debug mode

```bash
npm run test:debug
```

### Run specific test file

```bash
npx playwright test tests/specs/login.spec.js
```

### Run with specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run in headed mode (see the browser)

```bash
npx playwright test --headed
```

## Project Structure

```
.
├── src/
│   ├── fixtures/           # Custom Playwright fixtures
│   │   └── homeFixtures.js # Shared test setup and helpers
│   ├── pages/              # Page Object Models
│   │   ├── LoginAutomation/
│   │   │   └── LoginPage.js
│   │   └── WebFormAutomation/
│   │       └── AutomateWebFormPage.js
│   └── utils/              # Utility functions and data
│       ├── Logger.js       # Logging utility with color support
│       ├── DataValidator.js # Data validation utilities
│       └── testData.js     # Test data and URLs
├── tests/
│   └── specs/
│       ├── login.spec.js           # Login flow tests
│       ├── webForm.spec.js         # Web form automation tests
│       └── dataValidation.spec.js  # Data validation tests
├── playwright.config.js   # Playwright configuration
├── .env.example          # Environment variables template
└── package.json          # Project dependencies
```

## Key Components

### Fixtures (homeFixtures.js)

Provides a custom `practiceSitePage` fixture with helper methods:

- `selectPracticeSite(index)` - Select a practice site by index
- `navigateHome()` - Navigate back to home page
- `waitForElement(selector, timeout)` - Wait for element visibility
- `isPageReady()` - Check if page is fully loaded

### Page Objects

**LoginPage.js**

- `login(email, password)` - Perform login action
- `verifyWelcomeMessage()` - Verify successful login

**AutomateWebFormPage.js**

- `fillForm(data)` - Fill all form fields with provided data
- `verifySuccessMessage()` - Verify form submission success

### Logger

Color-coded logging with timestamps:

```javascript
Logger.info('Information message'); // Cyan
Logger.success('Success message'); // Green
Logger.warn('Warning message'); // Yellow
Logger.error('Error message'); // Red
Logger.debug('Debug message'); // Magenta
```

### Data Validator

Validate test data before execution:

```javascript
import { DataValidator } from '../../src/utils/DataValidator.js';

// Validate entire form
const validation = DataValidator.validateFormData(data);
if (!validation.isValid) {
  console.log(validation.errors);
}

// Individual validators
DataValidator.isValidEmail(email);
DataValidator.isValidPhoneNumber(phone);
DataValidator.isValidDate(date);
DataValidator.isValidName(name);
```

## Test Data

Centralized test data in `src/utils/testData.js`:

```javascript
export const webFormData = {
  country: 'India',
  title: 'Mr.',
  firstName: 'Marghoob',
  lastName: 'Alam',
  dob: '1995-08-15',
  joiningDate: '01/01/2024',
  email: 'marghoob@example.com',
  phoneCountryCode: '+91',
  phoneNumber: '9876543210',
  communication: 'Phone',
};
```

## Code Quality

### Format code

```bash
npm run format
```

### Run ESLint

```bash
npm run lint
```

### Fix linting issues

```bash
npm run lint:fix
```

## Viewing Reports

After test execution, open the HTML report:

```bash
npx playwright show-report
```

## Configuration

Playwright configuration in `playwright.config.js`:

- **Base URL**: `https://testerbud.com`
- **Timeouts**: 30s navigation, 5s action
- **Retries**: 2 on CI, 0 locally
- **Screenshots**: Captured on failure
- **Videos**: Retained on failure
- **Traces**: Collected on first retry

## Environment Variables

See `.env.example` for all available configuration options:

```bash
EMAIL              # Login email
PASSWORD           # Login password
BASE_URL           # Application URL
HEADLESS           # Run in headless mode
BROWSER            # Default browser (chromium|firefox|webkit)
LOG_LEVEL          # Logging level (info|debug|warn|error)
ACTION_TIMEOUT     # Action timeout in ms
NAVIGATION_TIMEOUT # Navigation timeout in ms
```

## Best Practices

✅ Always validate test data before test execution
✅ Use fixtures for common setup and teardown
✅ Leverage Page Objects for element interactions
✅ Add logging for better debugging
✅ Keep test data centralized
✅ Use descriptive test names
✅ Run validation tests before main test suite

## Improvements Made

- **Logger Integration**: Added comprehensive logging throughout tests and page objects
- **Enhanced Fixtures**: Added helper methods for common operations
- **Data Validation**: Created DataValidator utility for test data validation
- **Environment Configuration**: Added `.env.example` for better setup
- **Test Organization**: Added data validation test suite
- **Code Quality**: Improved imports consistency and error handling

## Troubleshooting

### Tests timing out

- Increase timeouts in `.env` file
- Check internet connection
- Verify selectors are correct

### Logger not showing colors

- Ensure terminal supports ANSI colors
- Some CI systems may need configuration changes

### Data validation fails

- Check format of test data matches expected format
- Review error messages from DataValidator
- Update test data in `testData.js`

## License

ISC
