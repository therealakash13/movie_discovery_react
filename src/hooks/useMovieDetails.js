import { useEffect, useState } from "react";
import { TMDB_DETAILS_URL } from "./Urls";
import { options } from "./useMovies";

export function useMovieDetails(id) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);

      const res = await fetch(TMDB_DETAILS_URL(id), options);
      const data = await res.json();

      setMovie(data);
      setLoading(false);
    }

    if (id) fetchMovie();
  }, [id]);

  return { movie, loading };
}
