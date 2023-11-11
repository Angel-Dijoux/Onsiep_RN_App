import axios from "axios";
import { getCurrentUserStorage } from "src/components/utils/currentUserStorage";
import { Config } from "src/config";

import { memoizedRefreshToken } from "./refreshToken";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = Config.baseUrl;

axiosInstance.interceptors.request.use(
  async (config) => {
    const currentUser = await getCurrentUserStorage();
    if (currentUser?.accessToken) {
      config.headers["Authorization"] = `Bearer ${currentUser?.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return memoizedRefreshToken().then((accessToken) => {
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);

export const axiosPrivate = axiosInstance;
