import { useEffect, useState } from "react";

import { options, TMDB_SEARCH_MULTI } from "../utils/Urls";

export function useSearch(query, page) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Reset when query changes
    setResults([]);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    async function fetchSearch() {
      setLoading(true);

      try {
        const res = await fetch(TMDB_SEARCH_MULTI(query, page), options);

        const data = await res.json();

        setResults((prev) => {
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
  return { results, loading, totalPages };
}
