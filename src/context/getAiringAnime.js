const fetchAiringAnime = async () => {
    try {
      const response = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing");
      const data = await response.json();
      return data.data; // Return the data for airing anime
    } catch (error) {
      console.error("Error fetching airing anime:", error);
      return []; // Return an empty array if there’s an error
    }
  };
  
  export default fetchAiringAnime;