import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-viking-project-production.up.railway.app/api", // ganti sesuai backend-mu
  withCredentials: false, // jika pakai Sanctum untuk login
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
