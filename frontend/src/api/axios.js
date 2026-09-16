import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5058/api',
});

// Interceptor to inject JWT Bearer token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;