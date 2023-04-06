import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:4200",
  timeout: 300000, // 5 minutes
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  },
});

export { axiosInstance as fetchData };
