import React, { createContext, useState, useContext, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState({});
  const [favoriteTV, setFavoriteTV] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // listeners for change in favorites
    if (userId) {
      const moviesRef = ref(database, `users/${userId}/favorites/movies`);
      const tvShowsRef = ref(database, `users/${userId}/favorites/tv`);

      const handleMoviesChange = (snapshot) => {
        if (snapshot.exists()) {
          setFavoriteMovies(snapshot.val());
        } else {
          setFavoriteMovies({});
        }
      };

      const handleTVShowsChange = (snapshot) => {
        if (snapshot.exists()) {
          setFavoriteTV(snapshot.val());
        } else {
          setFavoriteTV({});
        }
      };

      onValue(moviesRef, handleMoviesChange);
      onValue(tvShowsRef, handleTVShowsChange);

      return () => {
        off(moviesRef, "value", handleMoviesChange);
        off(tvShowsRef, "value", handleTVShowsChange);
      };
    } else {
      setFavoriteMovies({});
      setFavoriteTV({});
    }
  }, [userId]);

  return (
    <FavoritesContext.Provider value={{ favoriteMovies, favoriteTV }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
