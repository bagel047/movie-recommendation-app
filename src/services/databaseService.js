import { ref, set, remove, get } from "firebase/database";
import { database } from "../firebase/firebase";

// add movie to user's favorites
export const addMovieToFavorites = async (userId, movieId) => {
  const reference = ref(
    database,
    `users/${userId}/favorites/movies/${movieId}`
  );
  await set(reference, true);
};

// remove movie from user's favorites
export const removeMovieFromFavorites = async (userId, movieId) => {
  const reference = ref(
    database,
    `users/${userId}/favorites/movies/${movieId}`
  );
  await remove(reference);
};

// add TV show to user's favorites
export const addTVShowToFavorites = async (userId, tvShowId) => {
  const reference = ref(database, `users/${userId}/favorites/tv/${tvShowId}`);
  await set(reference, true);
};

// remove TV show from user's favorites
export const removeTVShowFromFavorites = async (userId, tvShowId) => {
  const reference = ref(database, `users/${userId}/favorites/tv/${tvShowId}`);
  await remove(reference);
};

// add movie to user's watchlist
export const addMovieToWatchlist = async (userId, movieId) => {
  const reference = ref(
    database,
    `users/${userId}/watchlist/movies/${movieId}`
  );
  await set(reference, true);
};

// remove movie from user's watchlist
export const removeMovieFromWatchlist = async (userId, movieId) => {
  const reference = ref(
    database,
    `users/${userId}/watchlist/movies/${movieId}`
  );
  await remove(reference);
};

// add TV show to user's watchlist
export const addTVShowToWatchlist = async (userId, tvShowId) => {
  const reference = ref(database, `users/${userId}/watchlist/tv/${tvShowId}`);
  await set(reference, true);
};

// remove TV show from user's watchlist
export const removeTVShowFromWatchlist = async (userId, tvShowId) => {
  const reference = ref(database, `users/${userId}/watchlist/tv/${tvShowId}`);
  await remove(reference);
};

// fetch favorite movies
export const getFavoriteMovies = async (userId) => {
  const reference = ref(database, `users/${userId}/favorites/movies`);
  const snapshot = await get(reference);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

// fetch favorite TV shows
export const getFavoriteTVShows = async (userId) => {
  const reference = ref(database, `users/${userId}/favorites/tv`);
  const snapshot = await get(reference);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

// fetch watchlisted movies
export const getWatchlistedMovies = async (userId) => {
  const reference = ref(database, `users/${userId}/watchlist/movies`);
  const snapshot = await get(reference);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

// fetch watchlisted TV shows
export const getWatchlistedTVShows = async (userId) => {
  const reference = ref(database, `users/${userId}/watchlist/tv`);
  const snapshot = await get(reference);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};
