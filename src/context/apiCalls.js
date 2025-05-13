// src/context/apiCalls.js
import axiosInstance from './axiosInstance';

// Get Popular Anime
export const getPopularAnime = async () => {
  const response = await axiosInstance.get('/top/anime?filter=bypopularity');
  return response.data.data;
};

// Get Airing Anime
export const getAiringAnime = async () => {
  const response = await axiosInstance.get('/seasons/now');
  return response.data.data;
};

// Get Upcoming Anime
export const getUpcomingAnime = async () => {
  const response = await axiosInstance.get('/seasons/upcoming');
  return response.data.data;
};