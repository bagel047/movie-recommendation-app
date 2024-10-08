import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Library from "./pages/library/Library";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import WebFont from "webfontloader";
import Movie from "./pages/Movie";
import TVShow from "./pages/TVShow";
import Season from "./pages/Season";
import Results from "./pages/Results";
import { AuthProvider } from "./contexts/authContext";
import { WatchlistProvider } from "./contexts/watchlistContext/watchlistContext";
import { FavoritesProvider } from "./contexts/favoritesContext/favoritesContext";
import { MessageProvider } from "./contexts/messageContext/messageContext";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins:400,500,700"],
      },
    });
  }, []);

  return (
    <AuthProvider>
      <MessageProvider>
        <FavoritesProvider>
          <WatchlistProvider>
            <BrowserRouter>
              <Header>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/movie/:id" element={<Movie />} />
                  <Route path="/tv/:id" element={<TVShow />} />
                  <Route
                    path="/tv/:tvID/season/:seasonID"
                    element={<Season />}
                  />
                  <Route
                    path="/results/:filter/:search"
                    element={<Results />}
                  />
                  <Route path="/library" element={<Library />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Header>
              <Footer />
            </BrowserRouter>
          </WatchlistProvider>
        </FavoritesProvider>
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;
