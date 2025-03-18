import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
});

// Add a request interceptor to attach the Bearer token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration and network errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    // Handle token expiration
    if (error.response?.status === 401) {
      // Clear user data and token
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // Redirect to login page
      window.location.href = '/login';
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;