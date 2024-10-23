// Base URL for the API
const BASE_URL = 'https://dummyjson.com'; // Replace with your actual base URL

// Object to store all API endpoints
export const ENDPOINTS = {
   //dummy json
   GET_PRODUCTS: `${BASE_URL}/products`,
   POST_PRODUCTS: `${BASE_URL}/products`,


   
  // Authentication
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REGISTER: `${BASE_URL}/auth/register`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,

  // User management
  GET_USER_PROFILE: `${BASE_URL}/user/profile`,
  UPDATE_USER_PROFILE: `${BASE_URL}/user/profile`,
  CHANGE_PASSWORD: `${BASE_URL}/user/change-password`,

  // Transactions
  CONFIRM_TRANSACTION: `${BASE_URL}/transaction/confirm`,
  GET_TRANSACTION_HISTORY: `${BASE_URL}/transaction/history`,
  GET_TRANSACTION_DETAILS: (id) => `${BASE_URL}/transaction/${id}`,

  // Crypto-related
  GET_CRYPTO_PRICES: `${BASE_URL}/crypto/prices`,
  GET_WALLET_BALANCE: `${BASE_URL}/wallet/balance`,
  SEND_CRYPTO: `${BASE_URL}/wallet/send`,

  // Donation-related
  CREATE_DONATION: `${BASE_URL}/donation/create`,
  GET_DONATION_HISTORY: `${BASE_URL}/donation/history`,

  // VRF (Verifiable Random Function) related
  GENERATE_RANDOM_NUMBER: `${BASE_URL}/vrf/generate`,
  VERIFY_RANDOM_NUMBER: `${BASE_URL}/vrf/verify`,

  // Miscellaneous
  SEARCH: `${BASE_URL}/search`,
  GET_APP_CONFIG: `${BASE_URL}/config`,

  // Admin-related (if applicable)
  ADMIN_GET_USERS: `${BASE_URL}/admin/users`,
  ADMIN_GET_TRANSACTIONS: `${BASE_URL}/admin/transactions`,
};

// You can also add helper functions here if needed
export const getEndpointWithParams = (endpoint, params) => {
  const url = new URL(endpoint);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url.toString();
};