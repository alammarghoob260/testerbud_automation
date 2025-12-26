// src/utils/testData.js
import { DataValidator } from './DataValidator.js';

// 🌐 Homepage URL
export const homePageUrl = 'https://testerbud.com/';

// 📝 Web Form Data (for registration / forms)
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
  communication: 'Phone', // or 'Email'
};

// 🔐 Forgot Password Flow Details
export const testDetails = {
  email: 'user@premiumbank.com',
  securityCode: 'BANK1234',
  oldPassword: 'Bank@123',
  newPassword: 'Bank@12345',
};

// 📝 Registration Flow Details
export const registrationDetails = {
  email: 'newuser@premiumbank.com',
  password: 'Bank@12345',
  confirmPassword: 'Bank@12345',
};

// 🛒 Ecommerce Flow Details
export const ecommerceDetails = {
  productsToAdd: [
    { name: 'Laptop Pro', qty: 2 },
    { name: 'Wireless Mouse', qty: 3 },
  ],
  searchTerm: 'Monitor 4K',
  searchedProduct: { name: 'Monitor 4K', qty: 1 },
  productToRemoveInCart: 'Wireless Mouse',

  // 📍 Address (fixed for validation)
  address: {
    fullName: 'John Smith', // valid name
    street: '123 Main Street', // 3+ chars
    city: 'New York', // 2+ chars
    state: 'NY', // 2+ chars
    zip: '10001', // 4–10 digits
  },

  // 💳 Payment (fixed for validation)
  payment: {
    cardNumber: '5555555555554444', // valid Mastercard test number
    expiry: '12/25', // MM/YY format
    cvv: '123', // 3-digit CVV
  },
};

// 📍 Address Data (for validation testing)
export const addressData = {
  fullName: 'Marghoob Alam', // valid name (2+ letters)
  street: '12A Green Park Road', // 3+ chars with numbers, letters, spaces
  city: 'Kolkata', // 2+ chars, letters only
  state: 'West Bengal', // 2+ chars, letters only
  zip: '700001', // 4–10 digits
};

// 💳 Payment Data (for validation testing)
export const paymentData = {
  cardNumber: '4111111111111111', // valid 16-digit Visa test number
  expiry: '12/25', // MM/YY format
  cvv: '123', // 3-digit CVV
};

// 🔧 Helper Generators

// Generate a valid address with overrides
export function generateAddress(overrides = {}) {
  const base = {
    fullName: 'Test User',
    street: '123 Test Street',
    city: 'Habra',
    state: 'West Bengal',
    zip: '743263',
  };
  const addr = { ...base, ...overrides };
  const { isValid, errors } = DataValidator.isValidAddress(addr);
  if (!isValid) throw new Error(`Invalid address: ${errors.join(', ')}`);
  return addr;
}

// Generate a valid payment with overrides
export function generatePayment(overrides = {}) {
  const base = {
    cardNumber: '4111111111111111',
    expiry: '11/27',
    cvv: '123',
  };
  const pay = { ...base, ...overrides };
  const { isValid, errors } = DataValidator.isValidPayment(pay);
  if (!isValid) throw new Error(`Invalid payment: ${errors.join(', ')}`);
  return pay;
}

// Validate cart items array
export function validateCartItems(items) {
  if (!Array.isArray(items)) {
    return { isValid: false, errors: ['Items must be an array'] };
  }

  const errors = [];
  for (const item of items) {
    if (!item.name || typeof item.name !== 'string' || item.name.trim().length === 0) {
      errors.push('Invalid product name (must be non-empty string)');
    }
    if (!DataValidator.isValidQuantity(item.qty)) {
      errors.push(`Invalid qty for ${item.name} (must be 1-99)`);
    }
  }
  return { isValid: errors.length === 0, errors };
}

// Test address with ecommerce data
export const ecommerceAddress = {
  fullName: 'John Doe',
  street: '123 Main Street, Apt 4B',
  city: 'New York',
  state: 'NY',
  zip: '10001',
};

// Test payment for ecommerce
export const ecommercePayment = {
  cardNumber: '5555555555554444', // Valid Mastercard test number
  expiry: '06/26',
  cvv: '456',
};
