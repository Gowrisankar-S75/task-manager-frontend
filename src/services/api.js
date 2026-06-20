import axios from "axios";

console.log("API URL =", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN SENT:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("HEADERS:", config.headers);

  return config;
});
export default api;