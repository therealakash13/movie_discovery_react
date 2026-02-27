import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import MovieProvider from "./context/MovieProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import MovieDetails from "./components/MoviesDetails.jsx";
import MediaPage from "./pages/MediaPage.jsx";
import Search from "./pages/Search.jsx";
import MediaListPage from "./pages/MediaListPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/:category" element={<MediaListPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/:mediaType/:id" element={<MovieDetails />} />
              <Route path="/:mediaType/:id/media" element={<MediaPage />}/>
            </Route>
          </Routes>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
