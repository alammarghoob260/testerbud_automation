// tests/ecommerce.spec.js
import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/homeFixtures.js';
import { ProductPage } from '../../src/pages/Ecommerce/ProductPage.js';
import { CartModal } from '../../src/pages/Ecommerce/CartModal.js';
import { ShippingModal } from '../../src/pages/Ecommerce/ShippingModal.js';
import { PaymentModal } from '../../src/pages/Ecommerce/PaymentModal.js';
import { SuccessModal } from '../../src/pages/Ecommerce/SuccessModal.js';
import { ecommerceDetails, validateCartItems } from '../../src/utils/testData.js';
import { DataValidator } from '../../src/utils/DataValidator.js';
import { Logger } from '../../src/utils/Logger.js';

test('Ecommerce flow: add, search, cart, shipping, payment, success', async ({
  practiceSitePage,
}) => {
  Logger.info('Starting Ecommerce Flow Test');

  // Validate input data early
  const cartValidation = validateCartItems([
    ...ecommerceDetails.productsToAdd,
    ecommerceDetails.searchedProduct,
  ]);
  if (!cartValidation.isValid) {
    Logger.error(`Cart items invalid: ${cartValidation.errors.join(', ')}`);
    expect(cartValidation.errors).toHaveLength(0);
    return;
  }
  const addressValidation = DataValidator.isValidAddress(ecommerceDetails.address);
  if (!addressValidation.isValid) {
    Logger.error(`Address invalid: ${addressValidation.errors.join(', ')}`);
    expect(addressValidation.errors).toHaveLength(0);
    return;
  }
  const paymentValidation = DataValidator.isValidPayment(ecommerceDetails.payment);
  if (!paymentValidation.isValid) {
    Logger.error(`Payment invalid: ${paymentValidation.errors.join(', ')}`);
    expect(paymentValidation.errors).toHaveLength(0);
    return;
  }
  Logger.success('Data validation passed');

  // Open ecommerce practice site (assume index for e-commerce option)
  await practiceSitePage.selectPracticeSite(4); // Adjust index if needed
  const productPage = new ProductPage(practiceSitePage.page);
  expect(await productPage.isLoaded()).toBeTruthy();

  // Add first two products
  for (const { name, qty } of ecommerceDetails.productsToAdd) {
    Logger.info(`Adding product: ${name} x${qty}`);
    await productPage.setQuantityAndAdd(name, qty);
  }

  // Search and add searched product
  Logger.info(`Searching for product: ${ecommerceDetails.searchTerm}`);
  await productPage.search(ecommerceDetails.searchTerm);
  Logger.info(
    `Adding searched product: ${ecommerceDetails.searchedProduct.name} x${ecommerceDetails.searchedProduct.qty}`
  );
  await productPage.setQuantityAndAdd(
    ecommerceDetails.searchedProduct.name,
    ecommerceDetails.searchedProduct.qty
  );

  // Open cart
  Logger.info('Opening cart modal');
  await productPage.openCart();
  const cartModal = new CartModal(practiceSitePage.page);
  expect(await cartModal.isOpen()).toBeTruthy();

  // Remove one product in cart
  Logger.info(`Removing product from cart: ${ecommerceDetails.productToRemoveInCart}`);
  await cartModal.removeProduct(ecommerceDetails.productToRemoveInCart);

  // Proceed to buy
  Logger.info('Proceeding to buy');
  await cartModal.proceedToBuy();

  // Shipping
  Logger.info('Filling shipping address');
  const shippingModal = new ShippingModal(practiceSitePage.page);
  expect(await shippingModal.isOpen()).toBeTruthy();
  await shippingModal.fillAddress(ecommerceDetails.address);
  await shippingModal.continue();

  // Payment
  Logger.info('Filling payment details');
  const paymentModal = new PaymentModal(practiceSitePage.page);
  expect(await paymentModal.isOpen()).toBeTruthy();
  await paymentModal.fillPayment(ecommerceDetails.payment);
  await paymentModal.submit();

  // Success
  Logger.info('Verifying order success');
  const successModal = new SuccessModal(practiceSitePage.page);
  expect(await successModal.isOpen()).toBeTruthy();
  await successModal.confirmAndClose();

  Logger.success('Ecommerce flow passed successfully');
});
