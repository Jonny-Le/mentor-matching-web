import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { STORAGE_KEYS } from '@src/constants/api.constants';

// TODO: Use real BE URL
const baseURL = 'https://jsonplaceholder.typicode.com';

const apiInstance = axios.create({ baseURL });

apiInstance.interceptors.request.use(
  (config) => {
    if (config.url) {
      const { origin } = new URL(config.url, baseURL);
      const allowedOrigins = [baseURL];
      const accessToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const get = (url: string, config?: AxiosRequestConfig) => apiInstance.get(url, config);
export const patch = (url: string, data?: any, config?: AxiosRequestConfig) => apiInstance.patch(url, data, config);
export const post = (url: string, data?: any, config?: AxiosRequestConfig) => apiInstance.post(url, data, config);
export const put = (url: string, data?: any, config?: AxiosRequestConfig) => apiInstance.put(url, data, config);
export const del = (url: string, config?: AxiosRequestConfig) => apiInstance.delete(url, config);

export type ApiCaller<T, D> = (data: D) => Promise<AxiosResponse<T>>;
