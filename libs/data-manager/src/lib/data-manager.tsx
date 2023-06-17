import axios, { AxiosInstance } from 'axios';
import { JWT_LOCAL_STORAGE_KEY } from '@fullstack/constants';
import axiosRetry from "axios-retry";
import { toast } from "react-toastify";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env['NX_BACKEND_HOST'],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosRetry(axiosInstance, {
  retries: 300,
  retryDelay: (_retryCount) => {
    return 100000;
  },
  onRetry: (_retryCount, error) => {
    error && toast.error(error.message);
    toast.info('Trying again soon...');
  }
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  console.log('Received response:', response);
  return response;
}, (error) => {
  console.error('Error response:', error);
  if (axiosRetry.isRetryableError(error)) {
    toast.info('Retrying request...');
    return axiosRetry.isRetryableError(error);
  }
  if (axiosRetry.isNetworkError(error)) toast.error('Network error.');
  return Promise.reject(error);
});

export { axiosInstance as fetchData };
