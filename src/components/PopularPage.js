import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';

function PopularPage() {
  const { getPopularAnime, popularAnime } = useGlobalContext();

  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <div className="anime-list">
      {popularAnime
        .filter(anime => anime.images?.jpg?.image_url)
        .map(anime => (
          <div key={anime.mal_id} className="anime-item">
            {/* Wrap the image with a Link that redirects to the anime details page */}
            <Link to={`/anime/${anime.mal_id}`}>
              <img 
                src={anime.images.jpg.image_url} 
                alt={anime.title} 
                loading='lazy' 
              />
              <h4>{anime.title}</h4>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default PopularPage;