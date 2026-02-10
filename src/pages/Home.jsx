import { useMovies } from "../hooks/useMovies";
import { TMDB_DISCOVER } from "../hooks/Urls";
import Loader from "../components/Loader";
import DiscoverBanner from "../components/DiscoverBanner";

export default function Home() {
  const { movies, loading } = useMovies("discover", `${TMDB_DISCOVER}`, 1);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col justify-evenly py-6 w-full">
      <h2 className="dark:text-text-dark text-text text-4xl font-semibold mb-4">
        Discover Movies
      </h2>

      <div className="rounded overflow-hidden">{movies.length > 0 && <DiscoverBanner movies={movies} />}</div>
    </div>
  );
}
