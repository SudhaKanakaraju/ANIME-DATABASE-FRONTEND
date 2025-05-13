import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/global';
import AnimeItem from '../components/AnimeItem';

const Upcoming = () => {
  const { getUpcomingAnime, upcomingAnime } = useGlobalContext();

  useEffect(() => {
    getUpcomingAnime();
  }, []);

  return (
    <div className="anime-list">
      {upcomingAnime
        .filter(anime => anime.images?.jpg?.image_url)
        .map(anime => (
          <AnimeItem anime={anime} key={anime.mal_id} />
        ))}
    </div>
  );
};

export default Upcoming;