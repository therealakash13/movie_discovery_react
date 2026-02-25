import Loader from "./Loader";
import { useMediaDetails } from "../hooks/useMediaDetails";
import { Play } from "../assets/SVGComponents";
import { Link, useParams } from "react-router";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export default function MediaDetails() {
  const { mediaType, id } = useParams();

  const { media, loading } = useMediaDetails({ mediaType, id });

  if (loading || !media) return <Loader />;

  const { title, poster, backdrop, rating, runtime, genres, overview, year } =
    media;

  return (
    <div className="w-full py-6 text-text dark:text-text-dark">
      {/* HERO BACKDROP */}
      <div
        className="relative h-[75vh] bg-cover bg-center rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${IMAGE_BASE + backdrop})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent" />

        <div className="absolute bottom-10 left-10 flex gap-10">
          <img
            src={POSTER_BASE + poster}
            alt={title}
            className="w-64 rounded-xl shadow-2xl"
          />

          <div className="max-w-3xl flex flex-col justify-between items-start py-1">
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl font-bold text-white">{title}</h1>

              {media.raw?.tagline && (
                <p className="w-fit px-3 py-1 text-gray-300 outline rounded-full bg-transparent backdrop-blur-2xl">{media.raw?.tagline}</p>
              )}

              <div className="flex gap-4 text-md text-gray-300">
                <span>{year}</span>
                {runtime && <span>{runtime} min</span>}
                <span>⭐ {rating.toFixed(1)}</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-primary px-3 py-1 rounded-full text-sm text-white font-semibold"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 leading-6 text-lg">{overview}</p>
            </div>

            <Link to={`/${mediaType}/${media.id}/media`}>
              <button className="flex items-center gap-3 cursor-pointer bg-primary hover:bg-primary/80 px-5 py-2 rounded text-white font-bold transition">
                <Play /> View Media
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="mt-16 max-w-6xl mx-auto px-4">
        <div className="px-10 py-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Overview</h2>

          <p className="text-gray-600 dark:text-text-dark/60 font-semibold leading-7 text-lg">
            {overview}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-10 text-secondary">
            {media.raw?.budget > 0 && (
              <div>
                <h3 className="font-semibold text-xl">Budget</h3>
                <p>₹ {media.raw?.budget.toLocaleString("en-IN")}</p>
              </div>
            )}

            {media.raw?.revenue > 0 && (
              <div>
                <h3 className="font-semibold text-xl">Revenue</h3>
                <p>₹ {media.raw?.revenue.toLocaleString("en-IN")}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-xl">Status</h3>
              <p>{media.raw?.status}</p>
            </div>

            <div>
              <h3 className="font-semibold text-xl">Languages</h3>
              <p>
                {media.raw?.spoken_languages
                  ?.map((lang) => lang.english_name)
                  .join(", ")}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl">Production Countries</h3>
              <p>
                {media.raw?.production_countries?.map((c) => c.name).join(", ")}
              </p>
            </div>
          </div>

          {/* PRODUCTION COMPANIES */}
          <div className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">
              Production Companies
            </h2>

            <div className="flex flex-wrap gap-8 items-center">
              {media.raw?.production_companies
                ?.filter((company) => company.logo_path)
                .map((company) => (
                  <img
                    key={company.id}
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="h-8 object-contain"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
