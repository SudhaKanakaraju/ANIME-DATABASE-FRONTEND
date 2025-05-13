import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

// Custom hook to access context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

// Provider component
export const GlobalProvider = ({ children }) => {
  // State management for different categories of anime
  const [popularAnime, setPopularAnime] = useState([]);
  const [airingAnime, setAiringAnime] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Axios instance configuration
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',  // Backend URL
    timeout: 10000,  // Timeout after 10 seconds
  });

  // Centralized fetch function to handle API requests
  const fetchData = async (url, setterFunction) => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get(url);
      setterFunction(response.data.data);  // Assuming 'data' is the key containing the results
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch popular anime
  const getPopularAnime = () => fetchData('/top/anime?filter=bypopularity', setPopularAnime);

  // Fetch airing anime
  const getAiringAnime = () => fetchData('/seasons/now', setAiringAnime);

  // Fetch upcoming anime
  const getUpcomingAnime = () => fetchData('/seasons/upcoming', setUpcomingAnime);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle search form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/anime?q=${search}`);
      setSearchResults(response.data.data);
      setIsSearch(true);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch anime data on component mount
  useEffect(() => {
    getPopularAnime();
    getAiringAnime();
    getUpcomingAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        getPopularAnime,
        getAiringAnime,
        getUpcomingAnime,
        popularAnime,
        airingAnime,
        upcomingAnime,
        searchResults,
        search,
        isSearch,
        handleSearch,
        handleSubmit,
        loading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};