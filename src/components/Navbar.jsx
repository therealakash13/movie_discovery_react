import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { MovieContext } from "../context/MovieContext";
import { TOGGLE_THEME } from "../context/action";

export default function Navbar() {
  const { state, dispatch } = useContext(MovieContext);

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
          to="top-rated"
          className="px-5 rounded-full py-0.5 transition-all"
        >
          Top Rated
        </NavLink>
        <NavLink
          to="upcoming"
          className="px-5 rounded-full py-0.5 transition-all"
        >
          Upcoming
        </NavLink>
        <NavLink to="auth">
          <button className="bg-primary text-white font-medium px-5 py-0.5 rounded cursor-pointer">
            SignIn
          </button>
        </NavLink>
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
