import React, { useEffect } from "react";
import Airing from "./Airing";
import { useGlobalContext } from "../context/global";

function AiringPage() {
  const { getAiringAnime } = useGlobalContext();

  useEffect(() => {
    getAiringAnime();
  }, [getAiringAnime]);

  return (
    <div>
      <h1>Airing Anime</h1>
      <Airing />
    </div>
  );
}

export default AiringPage;