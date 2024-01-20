import axios, { AxiosInstance } from "axios";
import cookie from "./cookie";

const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
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
