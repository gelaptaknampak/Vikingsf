import axios from "axios";

const api = axios.create({
  baseURL: "http://31.97.66.224:8000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
