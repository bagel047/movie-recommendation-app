import { useEffect, useState } from "react";
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";
import {
  addMovieToWatchlist,
  addTVShowToWatchlist,
  removeMovieFromWatchlist,
  removeTVShowFromWatchlist,
} from "../services/databaseService";
import { auth } from "../firebase/firebase";
import { useWatchlist } from "../contexts/watchlistContext/watchlistContext";

export default function Bookmark(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [id, setId] = useState(props.id);
  const { watchlistedMovies, watchlistedTV } = useWatchlist();

  useEffect(() => {
    setId(props.id);
  }, [props.id]);

  useEffect(() => {
    if (
      id &&
      ((watchlistedMovies && id in watchlistedMovies) ||
        (watchlistedTV && id in watchlistedTV))
    ) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [watchlistedMovies, watchlistedTV, id]);

  const handleClick = async () => {
    try {
      const userId = auth.currentUser.uid;

      if (!isClicked) {
        try {
          props.type === "movie"
            ? await addMovieToWatchlist(userId, props.id)
            : await addTVShowToWatchlist(userId, props.id);
          alert("Added to Watchlist");
        } catch (error) {
          console.error("Error adding to watchlist: ", error);
        }
      } else {
        try {
          props.type === "movie"
            ? await removeMovieFromWatchlist(userId, props.id)
            : await removeTVShowFromWatchlist(userId, props.id);
          alert("Removed from Watchlist");
        } catch (error) {
          console.error("Error removing from watchlist: ", error);
        }
      }

      setIsClicked(!isClicked);
    } catch (error) {
      alert("You're not logged in!");
      console.log(error);
    }
  };

  return (
    <button onClick={handleClick} className="hover:cursor-pointer z-50">
      {isClicked ? (
        <BookmarkIconSolid
          title="Remove from Watchlist"
          className="size-6 text-white hover:opacity-70"
        ></BookmarkIconSolid>
      ) : (
        <BookmarkIconOutline
          title="Add to Watchlist"
          className="size-6 hover:text-gray-400"
        ></BookmarkIconOutline>
      )}
    </button>
  );
}
