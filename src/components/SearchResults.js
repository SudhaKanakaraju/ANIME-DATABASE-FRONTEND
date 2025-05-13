import React, { useEffect } from "react";
import { useGlobalContext } from "../context/global";
import styled from "styled-components";

function SearchResults() {
  const { searchResults, isSearch } = useGlobalContext(); // Fetch search results from context

  useEffect(() => {
    if (isSearch && searchResults.length === 0) {
      console.log("No search results found.");
    }
  }, [isSearch, searchResults]);

  return (
    <SearchResultsStyled>
      <h2>Search Results</h2>
      <div className="anime-list">
        {searchResults.length > 0 ? (
          searchResults.map((anime) => (
            <div key={anime.mal_id} className="anime-item">
              <img src={anime.image_url} alt={anime.title} />
              <h3>{anime.title}</h3>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </SearchResultsStyled>
  );
}

const SearchResultsStyled = styled.div`
  padding: 2rem;
  background-color: #f4f4f4;

  .anime-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;

    .anime-item {
      background-color: #fff;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;

      img {
        width: 100%;
        border-radius: 10px;
      }

      h3 {
        margin-top: 1rem;
        font-size: 1.2rem;
      }
    }
  }
`;

export default SearchResults;