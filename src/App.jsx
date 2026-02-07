import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="w-full h-screen bg-bg dark:bg-bg-dark">
      <div className="flex flex-col w-11/12 mx-auto h-full bg-bg text-text font-secondary dark:bg-bg-dark dark:text-text-dark">
        <Navbar />
        <div className="flex flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
// create movie info page
