import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {getToken} from './token';
import {toast} from 'react-toastify';


const ERROR_STATUS = StatusCodes.SERVICE_UNAVAILABLE;

const shouldDisplayError = (response: AxiosResponse) => response.status === ERROR_STATUS;

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if(token) {
        config.headers['x-token'] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if(error.response && shouldDisplayError(error.response)) {
        toast.warn(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
