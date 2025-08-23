import { USER_LOCALSTORAGE_KEY } from "@/constants/user";
import { getLocalStorageData } from "@/lib/localStorage";
import { UserLocalStorage } from "@/types/auth";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3000";

export const axiosPublic: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosPrivate.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const data = getLocalStorageData<UserLocalStorage | null>(
      USER_LOCALSTORAGE_KEY,
    );

    if (data.token && config.headers) {
      config.headers.Authorization = data.token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
