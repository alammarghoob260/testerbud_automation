// tests/flightBooking.spec.js
import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { FlightBookingPage } from '../../src/pages/FlightbookingPractice/FlightBookingPage.js';
import { FlightTable } from '../../src/pages/FlightbookingPractice/FlightTable.js';
import { PaymentModal } from '../../src/pages/FlightbookingPractice/PaymentModal.js';
import { SuccessModal } from '../../src/pages/FlightbookingPractice/SuccessModal.js';
import { flightDetails, paymentDetails } from '../../src/utils/testData.js';
import { DataValidator } from '../../src/utils/DataValidator.js';

// Use existing fixture providing practiceSitePage
test('Flight booking: search, select, pay, success', async ({ practiceSitePage }) => {
  // Select Flight Booking Practice (index 6 as requested)
  await practiceSitePage.selectPracticeSite(5);

  // Debug: Get page title and content
  const pageTitle = await practiceSitePage.page.title();
  const bodyText = await practiceSitePage.page.locator('body').textContent();
  console.log('Page title:', pageTitle);
  console.log('Body text preview:', bodyText?.substring(0, 200));

  // Flight booking page
  const bookingPage = new FlightBookingPage(practiceSitePage.page);
  expect(await bookingPage.isLoaded()).toBeTruthy();

  // Validate input data before interaction
  const formValidation = DataValidator.isValidFlightForm(flightDetails.form);
  expect(formValidation.errors).toHaveLength(0);

  const paymentValidation = DataValidator.isValidPayment(paymentDetails);
  expect(paymentValidation.errors).toHaveLength(0);

  // Fill and submit search form
  await bookingPage.fillForm(flightDetails.form);
  await bookingPage.submit();

  // Flight options table
  const table = new FlightTable(practiceSitePage.page);
  expect(await table.isLoaded()).toBeTruthy();

  // Select one departure and one return (indices from test data)
  await table.selectDeparture(flightDetails.selection.departureIndex);
  await table.selectReturn(flightDetails.selection.returnIndex);

  // Payment modal
  const paymentModal = new PaymentModal(practiceSitePage.page);
  expect(await paymentModal.isOpen()).toBeTruthy();

  await paymentModal.fillPayment(paymentDetails);
  await paymentModal.submit();

  // Success modal
  const successModal = new SuccessModal(practiceSitePage.page);
  expect(await successModal.isOpen()).toBeTruthy();

  await successModal.verifySummary({ expectedTotal: null });
  await successModal.confirmAndClose();
});
