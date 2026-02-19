import { useEffect, useState } from "react";
import { TMDB_VIDEO_URL } from "./Urls";
import { options } from "./useMovies";

export function useMovieMedia(movieId) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      const res = await fetch(TMDB_VIDEO_URL(movieId), options);
      const data = await res.json();
      setVideos(data.results);
      setLoading(false);
    }

    fetchVideos();
  }, [movieId]);

  return { videos, loading };
}
