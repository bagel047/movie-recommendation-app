import { useState, useEffect } from "react";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useFavorites } from "../contexts/favoritesContext/favoritesContext";
import { auth } from "../firebase/firebase";
import {
  addMovieToFavorites,
  addTVShowToFavorites,
  removeMovieFromFavorites,
  removeTVShowFromFavorites,
} from "../services/databaseService";

export default function Heart(props) {
  const [isClicked, setIsClicked] = useState(false);
  const [id, setId] = useState(props.id);
  const { favoriteMovies, favoriteTV } = useFavorites();

  useEffect(() => {
    setId(props.id);
  }, [props.id]);

  useEffect(() => {
    if (
      id &&
      ((favoriteMovies && id in favoriteMovies) ||
        (favoriteTV && id in favoriteTV))
    ) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [favoriteMovies, favoriteTV, id]);

  const handleClick = async () => {
    try {
      const userId = auth.currentUser.uid;

      if (!isClicked) {
        try {
          props.type === "movie"
            ? await addMovieToFavorites(userId, props.id)
            : await addTVShowToFavorites(userId, props.id);
          alert("Added to Favorites");
        } catch (error) {
          console.error("Error adding to favorites: ", error);
        }
      } else {
        try {
          props.type === "movie"
            ? await removeMovieFromFavorites(userId, props.id)
            : await removeTVShowFromFavorites(userId, props.id);
          alert("Removed from Favorites");
        } catch (error) {
          console.error("Error removing from favorites: ", error);
        }
      }

      setIsClicked(!isClicked);
    } catch (error) {
      alert("You're not logged in!");
      console.log(error);
    }
  };

  return (
    <button onClick={handleClick} className="hover:cursor-pointer">
      {isClicked ? (
        <HeartIconSolid
          title="Remove from Favorites"
          className="size-6 text-red-600 hover:opacity-70"
        ></HeartIconSolid>
      ) : (
        <HeartIconOutline
          title="Add to Favorites"
          className="size-6 hover:text-red-600"
        ></HeartIconOutline>
      )}
    </button>
  );
}
