// API Configuration
export const API_BASE_URL = "https://rent-wheel-server-side-api.vercel.app";

// API endpoints
export const API_ENDPOINTS = {
  cars: "/cars",
  jwt: "/jwt",
  bookings: "/bookings",
  myBookings: "/my-bookings",
  myListings: "/my-listings",
  search: "/search"
};

// Helper function to build full API URL
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// Helper function for API calls with error handling
export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};