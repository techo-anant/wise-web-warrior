import api from './api';

// Get all cars with pagination
export const getAllCars = async (page = 1, limit = 10) => {
  const response = await api.get(`/cars?page=${page}&limit=${limit}`);
  return response.data;
};

// Get single car by ID
export const getCarById = async (id) => {
  const response = await api.get(`/cars/${id}`);
  return response.data;
};

// Search and filter cars
export const searchCars = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/cars/search?${params}`);
  return response.data;
};

// Create new car listing (admin only)
export const createCar = async (carData) => {
  const response = await api.post('/cars', carData);
  return response.data;
};

// Update car listing (admin only)
export const updateCar = async (id, carData) => {
  const response = await api.put(`/cars/${id}`, carData);
  return response.data;
};

// Delete car listing (admin only)
export const deleteCar = async (id) => {
  const response = await api.delete(`/cars/${id}`);
  return response.data;
};