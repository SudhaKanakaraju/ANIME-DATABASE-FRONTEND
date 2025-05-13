import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function AnimeItem({ anime }) {
  if (!anime || !anime.mal_id || !anime.images?.jpg?.image_url) return null;

  return (
    <AnimeCard>
      <Link to={`/anime/${anime.mal_id}`}>
        <img src={anime.images.jpg.image_url} alt={anime.title}  loading='lazy'/>
        <h4>{anime.title}</h4>
      </Link>
    </AnimeCard>
  );
}

const AnimeCard = styled.div`
  width: 200px;
  margin: 1rem;
  text-align: center;

  img {
    width: 100%;
    border-radius: 10px;
  }

  h4 {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #333;
  }
`;

export default AnimeItem;