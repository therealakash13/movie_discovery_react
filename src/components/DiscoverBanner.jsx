import { Link } from "react-router";
import { Info, Play } from "../assets/SVGComponents";
import { useAutoSlider } from "../hooks/useAutoSlider";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default function DiscoverBanner({ movies }) {
  const [index, setIndex] = useAutoSlider(movies.length, 10000);

  if (!movies.length) return null;

  const movie = movies[index];

  return (
    <section
      className="relative h-[80vh] bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url(${IMAGE_BASE}${movie.backdrop_path})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-neutral-900/80 via-neutral-900/40 to-transparent dark:from-neutral-900/80 dark:via-neutral-900/40" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl h-full flex flex-col gap-5 justify-end p-20 text-white dark:text-white">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex gap-4 text-sm font-medium text-gray-300 mb-3">
            <span className="text-lg">⭐ {movie.vote_average.toFixed(1)}</span>
            <span className="text-lg">{movie.release_date?.slice(0, 4)}</span>
          </div>
        </div>

        <p className="text-xl font-semibold text-gray-200 mb-6">
          {movie.overview}
        </p>

        <div className="flex gap-3">
          <button className="bg-white text-black font-bold px-6 py-2 rounded cursor-pointer flex gap-2 items-center">
            <Play />
            Play
          </button>
          <Link to={`/details/${movie.id}`}>
            <button className="bg-gray-600/70 px-6 py-2 font-bold rounded cursor-pointer flex gap-2 items-center">
              <Info />
              View Info
            </button>
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 right-10 flex gap-2">
        {movies.slice(0, 8).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-4 h-4 rounded-full ${
              index === i ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
