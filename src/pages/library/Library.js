import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useWatchlist } from "../../contexts/watchlistContext/watchlistContext";
import MovieCard from "../../components/MovieCard";
import { auth } from "../../firebase/firebase";

export default function Library() {
  const { watchlistedMovies, watchlistedTV } = useWatchlist();
  const watchlistedMoviesArray = Object.keys(watchlistedMovies);
  const watchlistedTVArray = Object.keys(watchlistedTV);
  const [fetchedDetails, setFetchedDetails] = useState(new Set());

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
    setFetchedDetails(new Set());
    console.log(userId);
  }, []);

  function updateFetchedDetails(newValue) {
    setFetchedDetails(newValue);
  }

  return (
    <>
      <div className="mb-12 mt-8">
        <h1 className="text-xl px-2 py-1">Movies watchlist</h1>
        <div className="flex flex-wrap">
          {watchlistedMoviesArray?.map((movieId) => {
            return (
              <MovieCard
                key={movieId}
                id={movieId}
                type={"movie"}
                setFetchedDetails={updateFetchedDetails}
              />
            );
          })}
        </div>
      </div>

      <div>
        <h1 className="text-xl px-2 py-1">TV Series watchlist</h1>
        <div>
          {watchlistedTVArray?.map((tvId) => {
            return (
              <MovieCard
                key={tvId}
                id={tvId}
                type={"tv"}
                setFetchedDetails={updateFetchedDetails}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
