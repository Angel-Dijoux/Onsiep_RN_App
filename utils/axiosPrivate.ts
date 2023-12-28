import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig, type AxiosHeaders } from "axios";

import { refreshToken } from "./refreshToken";
import { getCurrentUserStorage } from "../src/components/utils/currentUserStorage";
import { Config } from "../src/config";
import { getCachedAccessToken } from "$shared/auth/cachedAccessToken";
import { getAuthHeaders } from "$shared/auth/getHeaderAuthorization";



const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const currentUser = await getCurrentUserStorage();
    const currentToken = currentUser?.accessToken;
    if (currentToken) {
      const authHeaders = getAuthHeaders(currentToken);
      config.headers = { ...config.headers, ...authHeaders.headers } as AxiosHeaders;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (!originalRequest) return;

    await refreshToken();
    const authHeaders = getAuthHeaders(getCachedAccessToken());

    originalRequest.headers = { ...originalRequest.headers, ...authHeaders.headers } as AxiosHeaders;
    return axiosInstance(originalRequest);
  }
);

export const axiosPrivate = axiosInstance;
