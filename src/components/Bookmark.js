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
import { useMessage } from "../contexts/messageContext/messageContext";

export default function Bookmark(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [id, setId] = useState(props.id);
  const { watchlistedMovies, watchlistedTV } = useWatchlist();
  const { updateMessage } = useMessage();

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
          // alert("Added to Watchlist");
          updateMessage("Added to watchlist");
        } catch (error) {
          console.error("Error adding to watchlist: ", error);
          updateMessage("An error occured, try again");
        }
      } else {
        try {
          props.type === "movie"
            ? await removeMovieFromWatchlist(userId, props.id)
            : await removeTVShowFromWatchlist(userId, props.id);
          // alert("Removed from Watchlist");
          updateMessage("Removed from watchlist");
        } catch (error) {
          console.error("Error removing from watchlist: ", error);
          updateMessage("An error occured, try again");
        }
      }

      setIsClicked(!isClicked);
    } catch (error) {
      updateMessage("You need to log in to add to your watchlist");
      sessionStorage.setItem("previousUrl", window.location.pathname); // remember url before login
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleClick} className="hover:cursor-pointer z-50">
        {isClicked ? (
          <BookmarkIconSolid
            title="Remove from Watchlist"
            className={`size-5 text-white hover:opacity-70`}
          ></BookmarkIconSolid>
        ) : (
          <BookmarkIconOutline
            title="Add to Watchlist"
            className={`size-5 hover:text-gray-400`}
          ></BookmarkIconOutline>
        )}
      </button>
    </>
  );
}
