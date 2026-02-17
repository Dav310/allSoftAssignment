import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apis.allsoft.co/api/documentManagement",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically if exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  if (token) {
    config.headers.token = token;
  }
  if (userId) {
    config.headers.user_id = userId;
  }

  // Debugging: Check if headers are attached
  console.log("Request Headers:", config.headers);

  return config;
});

export default axiosInstance;
