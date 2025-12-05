import api from './api';

const authService = {
  // Manual registration
  register: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Manual login
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },

  // Google authentication
  googleAuth: async (authCode) => {
    const response = await api.post('/users/google', { authCode });
    return response.data;
  },

  // Facebook authentication
  facebookAuth: async (accessToken) => {
    const response = await api.post('/users/facebook', { accessToken });
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;