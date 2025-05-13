const fetchUpcomingAnime = async () => {
    try {
      const response = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
      const data = await response.json();
      return data.data; // Return the data for upcoming anime
    } catch (error) {
      console.error("Error fetching upcoming anime:", error);
      return []; // Return an empty array if there’s an error
    }
  };
  
  export default fetchUpcomingAnime;