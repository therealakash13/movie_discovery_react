import {  useEffect, useRef, useState } from "react";
import MovieCard from "../components/Card";
import Loader from "../components/Loader";
import { useDebounce } from "../hooks/useDebounce";
import { useSuggestions } from "../hooks/useSuggestions";
import { useSearch } from "../hooks/useSearch";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const suggestions = useSuggestions(debouncedQuery);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const observerRef = useRef();

  const { results, loading, totalPages } = useSearch(debouncedQuery, page);

  useEffect(() => {
    if (!query || showSuggestions) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loading, page, totalPages, query, showSuggestions]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setShowSuggestions(false);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Search Movies</h1>

      <div className="sticky top-16 z-40 backdrop-blur-md bg-bg/70 dark:bg-bg-dark/70 py-4 px-6">
        <div ref={containerRef} className="relative">
          <div className="sticky top-16 z-40 backdrop-blur-md bg-bg/70 dark:bg-bg-dark/70">
            <input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full p-3 rounded bg-secondary text-text-dark outline-none"
            />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-secondary rounded mt-2 z-50">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 hover:bg-bg-dark hover:text-text-dark cursor-pointer"
                  onClick={() => {
                    setQuery(item.title || item.name);
                  }}
                >
                  {item.title || item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {query && <div ref={observerRef} className="h-10"></div>}

      {loading && <Loader />}

      {!loading && query && results.length === 0 && (
        <p className="text-center text-gray-400 mt-6">No results found.</p>
      )}
    </div>
  );
}
