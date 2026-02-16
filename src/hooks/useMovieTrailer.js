import { useEffect, useState } from "react";
import { options } from "./useMovies"; // reuse your TMDB options
import { TMDB_VIDEO_URL } from "./Urls";

export function useMovieTrailer(movieId) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function fetchTrailer() {
      setLoading(true);

      try {
        const res = await fetch(TMDB_VIDEO_URL(movieId), options);

        const data = await res.json();
        console.log(data);

        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );

        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrailer();
  }, [movieId]);

  return { trailerKey, loading };
}
