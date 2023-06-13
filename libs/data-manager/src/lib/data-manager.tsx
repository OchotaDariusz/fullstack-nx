import axios, { AxiosInstance } from 'axios';
import { JWT_LOCAL_STORAGE_KEY } from '@fullstack/constants';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env['NX_BACKEND_HOST'],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export { axiosInstance as fetchData };
