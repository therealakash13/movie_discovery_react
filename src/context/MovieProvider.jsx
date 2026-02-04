import { useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";

export default function MovieProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <MovieContext.Provider value={{ theme, setTheme }}>
      {children}
    </MovieContext.Provider>
  );
}
