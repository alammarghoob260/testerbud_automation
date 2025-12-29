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
    fullName: 'John Smith',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
  },

  // 💳 Payment (fixed for validation)
  payment: {
    cardNumber: '5555555555554444',
    expiry: '12/25',
    cvv: '123',
  },
};

// ✈️ Flight Booking Flow Details
export const flightDetails = {
  form: {
    from: 'London',
    to: 'Singapore',
    departureDate: '2025-12-31',
    returnDate: '2026-01-10',
    oneWay: false,
    passengers: 1,
    travelClass: 'Economy',
  },
  selection: {
    departureIndex: 0,
    returnIndex: 0,
  },
  expectedTotal: 1032,
  availableFlights: {
    departure: [
      {
        airline: 'Global Wings',
        flightNo: 'GW205',
        route: 'London (08:00) → Singapore (12:00)',
        date: '2025-12-31',
        duration: '4h 0m',
        price: 649,
      },
      {
        airline: 'Sky High Airlines',
        flightNo: 'SH412',
        route: 'London (14:30) → Singapore (18:15)',
        date: '2025-12-31',
        duration: '3h 45m',
        price: 414,
      },
    ],
    return: [
      {
        airline: 'Global Wings',
        flightNo: 'GW206',
        route: 'Singapore (16:00) → London (20:00)',
        date: '2026-01-10',
        duration: '4h 0m',
        price: 689,
      },
      {
        airline: 'Air Swift',
        flightNo: 'AS790',
        route: 'Singapore (20:00) → London (23:30)',
        date: '2026-01-10',
        duration: '3h 30m',
        price: 565,
      },
    ],
  },
};

// Flight booking payment details
export const paymentDetails = {
  cardNumber: '4111111111111111',
  expiryDate: '09/26',
  expiry: '09/26',
  cvv: '123',
};

// 📍 Address Data (for validation testing)
export const addressData = {
  fullName: 'Marghoob Alam',
  street: '12A Green Park Road',
  city: 'Kolkata',
  state: 'West Bengal',
  zip: '700001',
};

// 💳 Payment Data (for validation testing)
export const paymentData = {
  cardNumber: '4111111111111111',
  expiry: '12/25',
  cvv: '123',
};

// 🔧 Helper Generators
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

export function generatePayment(overrides = {}) {
  const base = {
    cardNumber: '4111111111111111',
    expiry: '11/27',
    cvv: '123',
  };
  const pay = { ...base, ...overrides };
  ī;
  const { isValid, errors } = DataValidator.isValidPayment(pay);
  if (!isValid) throw new Error(`Invalid payment: ${errors.join(', ')}`);
  return pay;
}

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
  cardNumber: '5555555555554444',
  expiry: '06/26',
  cvv: '456',
};
