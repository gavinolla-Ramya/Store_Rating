import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Auth
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/signup', data);

// Stores
export const getAllStores = () => API.get('/user/stores');
export const getStoreDetails = (id) => API.get(`/user/store/${id}`);

// Ratings
export const submitRating = (data) => API.post('/user/rate', data);
export const updateRating = (data) => API.put('/user/rate', data);

// Admin
export const createStore = (data) => API.post('/admin/create-store', data);

export default API;
