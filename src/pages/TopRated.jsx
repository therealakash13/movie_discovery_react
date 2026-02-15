import { useMovies } from "../hooks/useMovies";
import { TMDB_TOP_RATED_URL } from "../hooks/Urls";
import MovieCard from "../components/Card";
import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";

export default function TopRated() {
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  const { movies, loading, totalPages } = useMovies(
    "topRated",
    `${TMDB_TOP_RATED_URL}`,
    page,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPages)
          setPage((prev) => prev + 1);
      },
      { threshold: 0.5 },
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loading]);

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div ref={observerRef} className="h-10"></div>

      {loading && <Loader />}
    </>
  );
}
