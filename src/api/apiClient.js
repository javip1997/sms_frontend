import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://sms-backend-9sq6.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach Bearer token to EVERY request
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * OPTIONAL: Handle expired/invalid token globally
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
