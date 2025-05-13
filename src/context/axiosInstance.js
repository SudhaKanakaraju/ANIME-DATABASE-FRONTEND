// src/context/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
  timeout: 10000, // 10 seconds timeout
});

export default axiosInstance;