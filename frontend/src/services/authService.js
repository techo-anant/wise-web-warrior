import api from './api';

// Register new user
export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

// Login user — saves token to localStorage
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Logout — clears localStorage
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current logged in user
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};