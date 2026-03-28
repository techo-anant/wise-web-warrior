import api from './api';

// Get logged in user profile
export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update logged in user profile
export const updateProfile = async (data) => {
  const response = await api.put('/users/profile', data);
  return response.data;
};

// ── ADMIN ONLY ──

// Get all users
export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Disable a user account
export const disableUser = async (id) => {
  const response = await api.put(`/users/${id}/disable`);
  return response.data;
};

// Promote user to admin
export const promoteUser = async (id) => {
  const response = await api.put(`/users/${id}/promote`);
  return response.data;
};