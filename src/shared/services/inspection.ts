import axios from 'axios';
import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const apiInspection = axios.create({
  baseURL: import.meta.env.VITE_INSPECTION_SERVICE_URL,
});

function interceptConfigRequest(
  config: InternalAxiosRequestConfig<unknown>,
): InternalAxiosRequestConfig<unknown> {
  return config;
}

function interceptErrorRequest(error: AxiosError): Promise<never> {
  return Promise.reject(error);
}

function interceptSuccessResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

function interceptErrorResponse(error: AxiosError): Promise<never> {
  if (!error.response?.data) {
    return Promise.reject(error.message);
  }

  return Promise.reject(error.response.data);
}

apiInspection.interceptors.request.use(
  interceptConfigRequest,
  interceptErrorRequest,
);

apiInspection.interceptors.response.use(
  interceptSuccessResponse,
  interceptErrorResponse,
);

export { apiInspection };
