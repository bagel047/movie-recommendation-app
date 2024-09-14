import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWatchlist } from "../../contexts/watchlistContext/watchlistContext";
import { auth } from "../../firebase/firebase";
import List from "./List";
import { useFavorites } from "../../contexts/favoritesContext/favoritesContext";
import PopupMessage from "../../components/PopupMessage";
import Recommendations from "../../components/Recommendations";

export default function Library() {
  const { watchlistedMovies, watchlistedTV } = useWatchlist();
  const watchlistedMoviesArray = Object.keys(watchlistedMovies);
  const watchlistedTVArray = Object.keys(watchlistedTV);
  const [showWatchlists, setShowWatchlists] = useState(true);

  const { favoriteMovies, favoriteTV } = useFavorites();
  const favoriteMoviesArray = Object.keys(favoriteMovies);
  const favoriteTVArray = Object.keys(favoriteTV);
  const [showFavorites, setShowFavorites] = useState(false);

  const userId = auth.currentUser?.uid;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userId) {
      navigate("/login", {
        state: {
          previousUrl: location.pathname,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    console.log("watchlisted movies: ", watchlistedMoviesArray);
    console.log("watchlisted tv: ", watchlistedTVArray);

    console.log(userId);
  }, []);

  return (
    <>
      <PopupMessage />
      <div className="mb-3 bg-zinc-700 bg-gradient-to-b from-zinc-900 to-zinc-800 py-8 px-3 lg:p-8 rounded-t-xl">
        <h1 className="tracking-wider text-3xl font-semibold mt-3 mb-4">
          Your library
        </h1>
        <div className="flex gap-1.5 text-sm">
          <button
            onClick={() => {
              setShowWatchlists(true);
              setShowFavorites(false);
            }}
            className={`${
              showWatchlists
                ? "bg-opacity-100 hover:bg-opacity-40"
                : "bg-opacity-30 border-1 border-zinc-700"
            } bg-zinc-950 hover:bg-opacity-100 rounded-xl py-2 px-3`}
          >
            Watchlists
          </button>
          <button
            onClick={() => {
              setShowFavorites(true);
              setShowWatchlists(false);
            }}
            className={`${
              showFavorites
                ? "bg-opacity-100 hover:bg-opacity-40"
                : "bg-opacity-30 border-1 border-zinc-700"
            } bg-zinc-950 hover:bg-opacity-100 rounded-xl py-2 px-3`}
          >
            Favorites
          </button>
        </div>
      </div>

      <div>
        {showWatchlists ? (
          <div className="">
            {watchlistedMoviesArray.length === 0 &&
            watchlistedTVArray.length === 0 ? (
              <div className="flex gap-4 justify-center items-center text-sm">
                <p className="inline-block mb-0">
                  Your watchlists are empty &nbsp; :(
                </p>
                <button
                  onClick={() => navigate("/home")}
                  className="inline-block border-1 border-zinc-950 bg-zinc-950 bg-opacity-15 hover:bg-opacity-100 rounded-full py-1.5 px-3"
                >
                  Discover
                </button>
              </div>
            ) : (
              <>
                <List
                  array={watchlistedMoviesArray}
                  name={"Movies watchlist"}
                  type={"movie"}
                />
                <List
                  array={watchlistedTVArray}
                  name={"TV series watchlist"}
                  type={"tv"}
                />
              </>
            )}
          </div>
        ) : null}

        {showFavorites ? (
          <div>
            {favoriteMoviesArray.length === 0 &&
            favoriteTVArray.length === 0 ? (
              <div className="flex gap-4 justify-center items-center text-sm">
                <p className="inline-block mb-0">
                  Your favorites lists are empty &nbsp; :(
                </p>
                <button
                  onClick={() => navigate("/home")}
                  className="inline-block border-1 border-zinc-950 bg-zinc-950 bg-opacity-15 hover:bg-opacity-100 rounded-full py-1.5 px-3"
                >
                  Discover
                </button>
              </div>
            ) : (
              <>
                <List
                  array={favoriteMoviesArray}
                  name={"Liked movies"}
                  type={"movie"}
                />
                <List
                  array={favoriteTVArray}
                  name={"Liked TV series"}
                  type={"tv"}
                />
              </>
            )}
          </div>
        ) : null}
      </div>

      {favoriteMoviesArray.length > 0 ? (
        <div className="mt-4 py-8 px-1 rounded-md bg-gradient-to-br from-zinc-950 to-zinc-900">
          <h2 className="text-lg mb-4 pl-10 text-red-600 tracking-wide font-semibold uppercase border-b border-zinc-800 pb-2.5">
            You might like:
          </h2>
          <Recommendations type="movie" />
        </div>
      ) : null}
    </>
  );
}
