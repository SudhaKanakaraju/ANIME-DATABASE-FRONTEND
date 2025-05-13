import React, { useEffect, useState } from 'react';
import Popular from './Popular';
import Airing from './Airing';
import Upcoming from './Upcoming';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AnimeItem from './AnimeItem';

function Homepage() {
  const {
    getPopularAnime,
    getAiringAnime,
    getUpcomingAnime,
    isSearch,
    searchResults,
    search,
    handleSubmit,
    handleSearch,
    popularAnime,
    airingAnime,
    upcomingAnime
  } = useGlobalContext();

  const [rendered, setRendered] = useState('popular');

  const switchComponent = () => {
    if (isSearch) {
      return (
        <div>
          <h2>Search Results</h2>
          <div className="anime-list">
            {searchResults.map((anime) => (
              <AnimeItem key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </div>
      );
    }

    switch (rendered) {
      case 'popular':
        return <Popular data={popularAnime} />;
      case 'airing':
        return <Airing data={airingAnime} />;
      case 'upcoming':
        return <Upcoming data={upcomingAnime} />;
      default:
        return <Popular data={popularAnime} />;
    }
  };

  useEffect(() => {
    if (rendered === 'popular') {
      getPopularAnime();
    } else if (rendered === 'airing') {
      getAiringAnime();
    } else if (rendered === 'upcoming') {
      getUpcomingAnime();
    }
  }, [rendered]);

  return (
    <HomepageStyled>
      <header>
        <div className="filter-btn">
          <button onClick={() => setRendered('popular')}>Popular</button>
          <button onClick={() => setRendered('airing')}>Airing</button>
          <button onClick={() => setRendered('upcoming')}>Upcoming</button>
        </div>
        <div className="logo">
          <h1>
            {isSearch
              ? 'Search Results'
              : rendered === 'popular'
              ? 'Popular Anime'
              : rendered === 'airing'
              ? 'Airing Anime'
              : 'Upcoming Anime'}
          </h1>
        </div>
        <div className="search-container">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Anime"
              value={search}
              onChange={handleSearch}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
      {switchComponent()}
    </HomepageStyled>
  );
}

const HomepageStyled = styled.div`
  background-color: #ededed;
  min-height: 100vh;
  padding: 2rem;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #282c34;
    color: white;

    .filter-btn {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;

      button {
        padding: 0.8rem;
        margin: 0 1rem;
        background-color: #ff5c5c;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #ff1c1c;
        }
      }
    }

    .logo h1 {
      margin-bottom: 1rem;
      font-size: 2rem;
    }

    .search-container {
      display: flex;
      justify-content: center;
      width: 100%;

      .search-form {
        display: flex;
        gap: 1rem;

        input {
          padding: 0.6rem;
          font-size: 1rem;
          border-radius: 5px;
          border: none;
        }

        button {
          padding: 0.6rem 1rem;
          background-color: #ff5c5c;
          color: white;
          border-radius: 5px;
          border: none;
          cursor: pointer;

          &:hover {
            background-color: #ff1c1c;
          }
        }
      }
    }
  }

  .anime-list {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
`;

export default Homepage;