import { USER_LOCALSTORAGE_KEY } from "@/context/user";
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
    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
