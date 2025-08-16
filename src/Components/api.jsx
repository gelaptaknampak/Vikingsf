import axios from "axios";

const api = axios.create({
  baseURL: "https://rf-vikings50.com:8000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
