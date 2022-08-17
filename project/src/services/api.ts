import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {processErrorHandle} from './process-error-handle';

const STATUSES = new Set([StatusCodes.BAD_REQUEST, StatusCodes.UNAUTHORIZED, StatusCodes.NOT_FOUND]);

const shouldDisplayError = (response: AxiosResponse) => STATUSES.has(response.status);

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if(error.response && shouldDisplayError(error.response)) {
        processErrorHandle(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};
