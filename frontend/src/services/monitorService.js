import api from './api';

// Get system status (admin only)
export const getStatus = async () => {
  const response = await api.get('/monitor/status');
  return response.data;
};