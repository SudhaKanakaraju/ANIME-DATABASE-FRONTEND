import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/global';
import AnimeItem from '../components/AnimeItem';

const Airing = () => {
  const { getAiringAnime, airingAnime } = useGlobalContext();

  useEffect(() => {
    getAiringAnime();
  }, []);

  return (
    <div className="anime-list">
      {airingAnime
        .filter(anime => anime.images?.jpg?.image_url)
        .map(anime => (
          <AnimeItem anime={anime} key={anime.mal_id} />
        ))}
    </div>
  );
};

export default Airing;