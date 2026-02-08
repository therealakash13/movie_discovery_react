import Pagination from "../components/Pagination";
import { useMovies } from "../hooks/useMovies";
import { TMDB_POPULAR_URL } from "../hooks/Urls";
import MovieCard from "../components/Card";
import { useSearchParams } from "react-router";
import Loader from "../components/Loader";

export default function Popular() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page")) || 1;

  const { movies, loading, totalPages } = useMovies(
    "popular",
    `${TMDB_POPULAR_URL}`,
    page,
  );

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col justify-center gap-10 py-4 w-full">
      <div className="card flex flex-nowrap gap-6 px-6 overflow-x-auto w-full">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setParams({ page: p })}
      />
    </div>
  );
}
