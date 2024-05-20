// import npm libs
import axios from "axios";
import Cookies from "js-cookie";

export type Callback<T> = (arg?: T) => T;

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_API_URL;
    config.withCredentials = true;
    config.headers.Authorization = `Bearer ${Cookies.get("access_token")}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.url.includes("/auth")
    ) {
		window.location.href = "/login";
    }
    return Promise.reject(error.response.data);
  }
);
