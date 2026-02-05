import { useEffect, useReducer } from "react";
import { MovieContext } from "./MovieContext";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

export default function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      state.user.theme === "dark",
    );
  }, [state.user.theme]);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
}
