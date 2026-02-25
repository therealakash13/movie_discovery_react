import { useContext } from "react";
import { Movie, TV } from "../assets/SVGComponents";
import { MovieContext } from "../context/MovieContext";
import { TOGGLE_MEDIA_TYPE } from "../context/action";

export default function MediaToggle() {
  const { state, dispatch } = useContext(MovieContext);
  const type = state.user.mediaType;

  return (
    <div className="relative w-52 h-10 bg-secondary rounded-lg p-1 flex">
      {/* Sliding Highlight */}
      <div
        className={`absolute top-1 left-1 h-8 w-[calc(50%-4px)] bg-primary rounded-md transition-transform duration-300 ${
          type === "movie" ? "translate-x-0" : "translate-x-full"
        }`}
      />

      {/* Movie Button */}
      <button
        onClick={() => dispatch({ type: TOGGLE_MEDIA_TYPE })}
        className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer transition-colors ${
          type === "movie" ? "text-white" : "text-gray-400"
        }`}
      >
        <Movie className="w-4 h-4" innerfill={type === "tv" ? "#99a1af" : "#fff"} />
        Movies
      </button>

      {/* TV Button */}
      <button
        onClick={() => dispatch({ type: TOGGLE_MEDIA_TYPE })}
        className={`relative z-10 flex-1 flex items-center justify-center gap-2 text-sm font-medium cursor-pointer transition-colors ${
          type === "tv" ? "text-white" : "text-gray-400"
        }`}
      >
        <TV className="w-4 h-4" innerfill={type === "movie" ? "#99a1af" : "#fff"}/>
        TV Shows
      </button>
    </div>
  );
}
