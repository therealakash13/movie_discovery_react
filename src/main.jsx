import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Discover from "./pages/Discover.jsx";
import Auth from "./pages/Auth.jsx";
import MovieProvider from "./context/MovieProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import MediaDetails from "./pages/MediaDetails.jsx";
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
              <Route path=":mediaType">
                <Route index element={<Discover />} />
                <Route path=":category" element={<MediaListPage />} />
                <Route path="media/:id" element={<MediaPage />} />
                <Route path="detail/:id" element={<MediaDetails />} />
              </Route>

              <Route path="search" element={<Search />} />
              <Route path="auth" element={<Auth />} />
            </Route>
          </Routes>
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
