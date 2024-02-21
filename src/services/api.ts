import axios, { AxiosInstance } from "axios";
import cookie from "./cookie";

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const token = cookie.getToken();

  if (token) {
    config.headers.setAuthorization(token);
  }

  return config;
});

export default api;
