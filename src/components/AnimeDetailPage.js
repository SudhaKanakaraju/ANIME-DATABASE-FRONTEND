import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const AnimeDetailPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
      setAnime(res.data.data);
    };

    const fetchCharacters = async () => {
      const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
      setCharacters(res.data.data);
    };

    fetchAnimeDetails();
    fetchCharacters();
  }, [id]);

  return (
    <DetailStyled>
      {anime && (
        <div className="anime-container">
          <Link to={`/anime/${id}`}>
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="poster"
            />
          </Link>
          <div className="info">
            <h1>{anime.title}</h1>
            <p>{anime.synopsis}</p>

            {anime.trailer?.embed_url && (
              <div className="trailer">
                <h3>Trailer</h3>
                <iframe
                  src={anime.trailer.embed_url}
                  title="Anime Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="characters">
        <h2>Top Characters</h2>
        <div className="character-list">
          {characters.map((char) => (
            <div key={char.character.mal_id} className="character-card">
              <img
                src={char.character.images.jpg.image_url}
                alt={char.character.name}
              />
              <p>{char.character.name}</p>
            </div>
          ))}
        </div>
      </div>
    </DetailStyled>
  );
};

export default AnimeDetailPage;

const DetailStyled = styled.div`
  padding: 20px;

  .anime-container {
    display: flex;
    gap: 20px;
  }

  .poster {
    width: 200px;
    border-radius: 8px;
  }

  .info {
    max-width: 600px;
  }

  .trailer iframe {
    width: 100%;
    height: 300px;
    margin-top: 10px;
  }

  .characters {
    margin-top: 40px;
  }

  .character-list {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  .character-card {
    text-align: center;
    width: 100px;
  }

  .character-card img {
    width: 100px;
    border-radius: 8px;
  }
`;