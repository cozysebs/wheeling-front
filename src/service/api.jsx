import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

// JWT 자동 포함
api.interceptors.request.use((config)=>{
  const token = localStorage.getItem("authorization");
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`;  // 아래로 수정함. 오류시 원상복구.
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});