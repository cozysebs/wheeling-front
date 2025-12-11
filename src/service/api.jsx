import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// JWT 자동 포함
api.interceptors.request.use((config)=>{
  const token = localStorage.getItem("authorization");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});