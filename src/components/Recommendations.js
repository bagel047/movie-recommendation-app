import { useEffect, useState } from "react";
import { useFavorites } from "../contexts/favoritesContext/favoritesContext";
import MovieSlider from "./MovieSlider";
import { useWatchlist } from "../contexts/watchlistContext/watchlistContext";

export default function Recommendations(props) {
  const { favoriteMovies } = useFavorites();
  const { watchlistedMovies } = useWatchlist();
  const favoriteMoviesArray = Object.keys(favoriteMovies);
  const [indexSet, setIndexSet] = useState(false);
  const [randomIndex, setRandomIndex] = useState();

  console.log(favoriteMoviesArray, favoriteMoviesArray.length);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    if (!indexSet && favoriteMoviesArray.length > 0) {
      setRandomIndex(randomNumberInRange(0, favoriteMoviesArray.length - 1));
      setIndexSet(true);
    }
  }, [favoriteMoviesArray]);

  useEffect(() => {
    console.log(randomIndex);
  });

  return (
    <div>
      {console.log("in return: ", randomIndex)}
      {indexSet ? (
        <MovieSlider
          name="Recommendations-Library"
          category={`${favoriteMoviesArray[randomIndex]}/recommendations`}
          categoryFix={`${favoriteMoviesArray[randomIndex]}-recommendations`}
          type={props.type}
          favoriteMovies={favoriteMovies}
          watchlistedMovies={watchlistedMovies}
        />
      ) : null}
    </div>
  );
}
