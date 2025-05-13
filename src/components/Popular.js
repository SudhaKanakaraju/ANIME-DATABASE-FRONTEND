import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/global';
import AnimeItem from '../components/AnimeItem';

function Popular() {
  const { getPopularAnime, popularAnime } = useGlobalContext();

  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <div className="anime-list">
      {popularAnime
        .filter(anime => anime.images?.jpg?.image_url)
        .map(anime => (
          <AnimeItem anime={anime} key={anime.mal_id} />
        ))}
    </div>
  );
}

export default Popular;