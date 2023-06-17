import axios, { AxiosInstance } from 'axios';
import { JWT_LOCAL_STORAGE_KEY, serverConstants } from '@fullstack/constants';
import axiosRetry from 'axios-retry';
import { toast } from 'react-toastify';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: serverConstants.backendHost,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': serverConstants.frontendHost ?? '*',
    'Cache-Control': 'private, max-age=100000, must-revalidate',
  },
});

axiosRetry(axiosInstance, {
  retries: 5,
  retryDelay: (_retryCount) => {
    return 10000;
  },
  onRetry: (_retryCount, error) => {
    error && toast.error(error.message);
    toast.info('Trying again soon...');
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axiosRetry.isRetryableError(error)) {
      toast.info('Retrying request...');
      return axiosRetry.isRetryableError(error);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as fetchData };
