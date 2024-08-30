import React, { createContext, useState, useContext, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { database } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [watchlistedMovies, setWatchlistedMovies] = useState({});
  const [watchlistedTV, setWatchlistedTV] = useState({});

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
    // listeners for change in watchlist
    if (userId) {
      const moviesRef = ref(database, `users/${userId}/watchlist/movies`);
      const tvShowsRef = ref(database, `users/${userId}/watchlist/tv`);

      const handleMoviesChange = (snapshot) => {
        if (snapshot.exists()) {
          setWatchlistedMovies(snapshot.val());
        } else {
          setWatchlistedMovies({});
        }
      };

      const handleTVShowsChange = (snapshot) => {
        if (snapshot.exists()) {
          setWatchlistedTV(snapshot.val());
        } else {
          setWatchlistedTV({});
        }
      };

      onValue(moviesRef, handleMoviesChange);
      onValue(tvShowsRef, handleTVShowsChange);

      return () => {
        off(moviesRef, "value", handleMoviesChange);
        off(tvShowsRef, "value", handleTVShowsChange);
      };
    } else {
      setWatchlistedMovies({});
      setWatchlistedTV({});
    }
  }, [userId]);

  return (
    <WatchlistContext.Provider value={{ watchlistedMovies, watchlistedTV }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
