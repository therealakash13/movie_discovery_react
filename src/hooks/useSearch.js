import { useEffect, useState } from "react";
import { options } from "./useMovies";
import { TMDB_SEARCH } from "./Urls";

export function useSearch(query, page) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Reset when query changes
    setMovies([]);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    async function fetchSearch() {
      setLoading(true);

      try {
        const res = await fetch(TMDB_SEARCH(query, page), options);

        const data = await res.json();

        setMovies((prev) => {
          const merged = [...prev, ...data.results];
          return Array.from(new Map(merged.map((m) => [m.id, m])).values());
        });

        setTotalPages(data.total_pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSearch();
  }, [query, page]);
  return { movies, loading, totalPages };
}
