import { useEffect, useState } from "react";
import { options } from "./useMovies";

export function useSuggestions(query) {
  const [suggestions, setSuggestions] = useState([]);

  const normalizedQuery = query.trim();

  useEffect(() => {
    if (!normalizedQuery) return;

    const controller = new AbortController();

    async function fetchSuggestions() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${normalizedQuery}`,
          {...options, signal: controller.signal },
        );

        const data = await res.json();
        setSuggestions(data.results.slice(0, 6));
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    }

    fetchSuggestions();

    return () => controller.abort();
  }, [normalizedQuery]);

  return normalizedQuery ? suggestions : [];
}
