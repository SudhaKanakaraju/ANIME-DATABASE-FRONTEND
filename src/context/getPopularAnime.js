import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create context
const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

// Action types
const LOADING = "LOADING";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const SEARCH = "SEARCH";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const SET_SEARCH = "SET_SEARCH";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };

    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };

    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };

    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false };

    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };

    case SET_SEARCH:
      return { ...state, isSearch: action.payload };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  popularAnime: [],
  upcomingAnime: [],
  airingAnime: [],
  searchResults: [],
  isSearch: false,
  loading: false,
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = React.useState("");

  // Handle change in search input
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      dispatch({ type: SET_SEARCH, payload: false });
    }
  };

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      dispatch({ type: SET_SEARCH, payload: true });
    } else {
      dispatch({ type: SET_SEARCH, payload: false });
      alert("Please enter a valid search term");
    }
  };

  // Fetch popular anime
  const getPopularAnime = async () => {
    try {
      dispatch({ type: LOADING });

      const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
      const data = await response.json();

      dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
    } catch (error) {
      console.error("Failed to fetch popular anime:", error);
    }
  };

  // Fetch upcoming anime
  const getUpcomingAnime = async () => {
    try {
      dispatch({ type: LOADING });
      const response = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
      const data = await response.json();
      dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
    } catch (error) {
      console.error("Error fetching upcoming anime:", error);
    }
  };

  // Fetch airing anime
  const getAiringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({ type: GET_AIRING_ANIME, payload: data.data });
  };

  // Search anime
  const searchAnime = async (anime) => {
    dispatch({ type: LOADING });
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=desc`);
    const data = await response.json();
    dispatch({ type: SEARCH, payload: data.data });
  };

  // Fetch when the component mounts
  useEffect(() => {
    getPopularAnime();
    getUpcomingAnime();
    getAiringAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};