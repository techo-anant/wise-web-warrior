import api from './api';

// Get all dealers
export const getAllDealers = async () => {
  const response = await api.get('/dealers');
  return response.data;
};

// Get single dealer by ID
export const getDealerById = async (id) => {
  const response = await api.get(`/dealers/${id}`);
  return response.data;
};

// Search dealers by city
export const getDealersByCity = async (city) => {
  const response = await api.get(`/dealers/search?city=${city}`);
  return response.data;
};