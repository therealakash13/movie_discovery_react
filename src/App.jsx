import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-bg dark:bg-bg-dark">
      <div className="flex flex-col w-11/12 mx-auto min-h-screen text-text font-secondary dark:text-text-dark">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/70 dark:bg-bg-dark/70">
          <Navbar />
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// finalize it or add more features like:
// 1. Watch list + Favorites
// 2. Search with Debounce + Suggestions
// 3. Infinite Scroll Instead of Pagination - Done
// 4. Movie Trailer Modal
// 5. Advanced Filtering : Filter by rating, year or popularity
// 6. Instead of modal make a media page as well where all the video like trailer and feature video clips and other goes
// and instead of play make card go to details or media page (basically two buttons media and details).
// There utilize all the data provided by tmdb video url
// route would be like details page url (/media/id)
