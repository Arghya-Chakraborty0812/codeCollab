import axios from 'axios';
export const baseURL = 'http://localhost:8080';
const httpClient = axios.create({ baseURL });

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default httpClient;