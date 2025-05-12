const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api';

/**
 * Generic fetch function for API requests
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (GET, POST, PATCH, PUT, DELETE)
 * @param {object} data - Request body data
 * @returns {Promise} - Promise with response data
 */
export const fetchAPI = async (endpoint, method = 'GET', data = null) => {
  try {
    const url = `${baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Include cookies for authentication
    };

    if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    // Check if response is empty
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * User profile related API calls
 */
export const userAPI = {
  // Get current user profile
  getProfile: () => fetchAPI('authentication'),
  
  // Update user profile
  updateProfile: (data) => fetchAPI('edit-profile', 'PATCH', data),
  
  // Login user
  login: (credentials) => fetchAPI('login', 'POST', credentials),
  
  // Register new user
  register: (userData) => fetchAPI('register', 'POST', userData),
  
  // Logout user
  logout: () => fetchAPI('logout', 'POST')
};

/**
 * Food related API calls
 */
export const foodAPI = {
  // Get all food items
  getAllFood: (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.zip_code) queryParams.append('zip_code', params.zip_code);
    if (params.limit) queryParams.append('limit', params.limit);
    
    const query = queryParams.toString();
    return fetchAPI(`get-food${query ? `?${query}` : ''}`);
  },
  
  // Get specific food item
  getFoodItem: (id) => fetchAPI(`get-inpost/${id}`),
};

export default {
  fetchAPI,
  userAPI,
  foodAPI
}; 