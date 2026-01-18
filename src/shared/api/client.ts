import axios from "axios";

export const API_BASE_URL = "https://exchange-example.switchflow.biz";

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized globally if needed (e.g. redirect to login)
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      // Optional: window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
