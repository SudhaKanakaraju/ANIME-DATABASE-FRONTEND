import React, { useEffect } from "react";
import Upcoming from "./Upcoming";
import { useGlobalContext } from "../context/global";

function UpcomingPage() {
  const { getUpcomingAnime } = useGlobalContext();

  useEffect(() => {
    getUpcomingAnime();
  }, [getUpcomingAnime]);

  return (
    <div>
      <h1>Upcoming Anime</h1>
      <Upcoming />
    </div>
  );
}

export default UpcomingPage;