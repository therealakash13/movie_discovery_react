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

  const base = `/${mediaType}`;
  const navStyle = ({ isActive }) =>
    `
  relative px-5 py-1 transition-all duration-300
  ${isActive ? "text-primary font-semibold" : "text-secondary dark:text-text-dark"}
  
  after:absolute
  after:left-0
  after:-bottom-0
  after:h-[2px]
  after:w-full
  after:bg-primary
  after:rounded-full
  after:origin-center
  after:transition-transform
  after:duration-300
  ${isActive ? "after:scale-x-100" : "after:scale-x-0"}
  `;

  return (
    <nav className="flex items-center justify-between py-5">
      <Link
        to={`${base}`}
        className="font-primary text-3xl font-semibold  text-primary"
      >
        NFlix
      </Link>
      <ul className="flex gap-10 text-xl font-medium items-center">
        <div className="relative flex gap-10">
          <NavLink to={`${base}`} end className={navStyle}>
            Home
          </NavLink>
          <NavLink to={`${base}/popular`} className={navStyle}>
            Popular
          </NavLink>
          <NavLink to={`${base}/top_rated`} className={navStyle}>
            Top Rated
          </NavLink>
          <NavLink to={`${base}/upcoming`} className={navStyle}>
            {mediaType === "tv" ? "On the Air" : "Upcoming"}
          </NavLink>
          <NavLink to="/search" className={navStyle}>
            Search
          </NavLink>
        </div>
        {/* if user exists show user info else */}
        {user ? (
          <NavLink to="/auth">
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
          <NavLink to="/auth">
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
