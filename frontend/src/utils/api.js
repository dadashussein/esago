import axios from "axios";
import Cookies from "js-cookie";

export const baseUrl = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const errorMessage =
        error.response.data.detail ||
        "An error occurred while making the request";
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
