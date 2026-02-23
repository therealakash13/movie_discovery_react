import MovieCard from "../components/Card";
import { useContext, useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import { MovieContext } from "../context/MovieContext";
import { useMedia } from "../hooks/useMedia";

export default function Upcoming() {
  const [page, setPage] = useState(1);
  const observerRef = useRef();
  const { state } = useContext(MovieContext);
  const mediaType = state.user.mediaType;

  const { media, loading, totalPages } = useMedia({
    mediaType,
    category: "upcoming",
    page,
  });

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
        {media.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div ref={observerRef} className="h-10"></div>

      {loading && <Loader />}
    </>
  );
}
