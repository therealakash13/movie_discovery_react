import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { MovieContext } from "../context/MovieContext";
import { TOGGLE_THEME } from "../context/action";
import { useAuth } from "../hooks/useAuth";
import MediaToggle from "./MediaToggle";

export default function Navbar() {
  const { user } = useAuth();
  const { state, dispatch } = useContext(MovieContext);
  const mediaType = state.user?.mediaType;

  return (
    <nav className="flex items-center justify-between py-5">
      <Link
        to="/"
        className="font-primary text-4xl font-semibold  text-primary"
      >
        NFlix
      </Link>
      <ul className="flex gap-10 text-2xl font-medium items-center">
        <NavLink to="/" className="px-5 rounded-full py-0.5 transition-all">
          Home
        </NavLink>
        <NavLink
          to="popular"
          className="px-5 rounded-full py-0.5 transition-all"
        >
          Popular
        </NavLink>
        <NavLink
          to="top_rated"
          className="px-5 rounded-full py-0.5 transition-all"
        >
          Top Rated
        </NavLink>
        <NavLink
          to="upcoming"
          className="px-5 rounded-full py-0.5 transition-all"
        >
          {mediaType === "tv" ? "On the Air" : "Upcoming"}
        </NavLink>
        <NavLink
          to="search"
          className="px-5 rounded-full py-0.5 transition-all"
        >
          Search
        </NavLink>
        {/* if user exists show user info else */}
        {user ? (
          <NavLink to="auth">
            <button className="bg-secondary text-white font-medium px-5 py-0.5 rounded cursor-pointer flex gap-3 justify-center items-center">
              <img
                className="w-10 h-10 rounded-full border-2 border-secondary scale-120"
                src={user?.photoURL}
                alt={user?.displayName}
              />
              {user?.displayName}
            </button>
          </NavLink>
        ) : (
          <NavLink to="auth">
            <button className="bg-primary text-white font-medium px-5 py-0.5 rounded cursor-pointer">
              SignIn
            </button>
          </NavLink>
        )}

        <MediaToggle />

        <button
          className="cursor-pointer"
          onClick={() => dispatch({ type: TOGGLE_THEME })}
        >
          {state.user.theme === "dark" ? "🌙" : "🔆"}
        </button>
      </ul>
    </nav>
  );
}
