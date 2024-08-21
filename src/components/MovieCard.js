import { useEffect, useState } from "react";
import Bookmark from "./Bookmark";
import StarRating from "./StarRating";
import { options } from "../shared";

export default function MovieCard(props) {
  const [details, setDetails] = useState();
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState("N/A");
  const [seasons, setSeasons] = useState("N/A");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${
        props.type
      }/${props.data.id.toString()}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        props.setFetchedDetails((prev) => new Set(prev).add(props.data.id));
      });
  }, []);

  useEffect(() => {
    if (props.type === "movie") {
      // movie
      setName(details?.title);
      setReleaseDate(details?.release_date);
      setRuntime(details?.runtime);
    } else {
      // tv show
      setName(details?.name);
      setReleaseDate(details?.first_air_date);
      setSeasons(details?.number_of_seasons);
    }
  }, [details]);

  function getRatingColor(rating) {
    if (rating >= 8) {
      return "bg-green-400 text-white dark:bg-green-500 dark:text-white";
    } else if (rating >= 7) {
      return "bg-lime-400 text-white dark:bg-lime-400 dark:text-white";
    } else if (rating >= 6) {
      return "bg-yellow-400 text-white dark:bg-yellow-500 dark:text-white";
    } else if (rating >= 5) {
      return "bg-orange-400 text-white dark:bg-orange-500 dark:text-white";
    } else if (rating >= 1) {
      return "bg-red-400 text-white dark:bg-red-500 dark:text-white";
    } else {
      return "bg-gray-200 text-white dark:bg-gray-300 dark:text-white";
    }
  }

  return (
    <div className="mr-1 w-56 h-fit bg-inherit inline-block snap-start hover:bg-zinc-800 hover:scale-[1.06] ease-in-out duration-150 p-2 rounded-md">
      <div className="relative w-full overflow-hidden">
        <img
          id="moviePoster"
          className="rounded-t-sm aspect-video object-cover w-full h-full"
          src={"https://image.tmdb.org/t/p/w500" + props.data?.poster_path}
          alt={name + " Poster"}
        />
      </div>
      <div className="w-full">
        <h5
          className="pt-3 text-md text-white dark:text-white font-semibold truncate w-full overflow-hidden"
          title={name}
        >
          {name}
        </h5>
        <span className="mr-2 text-gray-900 dark:text-slate-300 text-xs">
          {details?.genres[0] ? details.genres[0].name : null}
          {details?.genres[1] ? ", " + details.genres[1].name : null}
        </span>
        <div className="flex items-center mt-2.5 mb-5">
          <StarRating rating={details?.vote_average || 0} />

          <span
            title="Rating"
            className={`text-xs font-semibold px-2.5 py-0.5 rounded ms-3 ${
              isNaN(Math.round(details?.vote_average * 10) / 10)
                ? "bg-gray-200 text-gray-800 dark:bg-gray-300 dark:text-gray-800"
                : getRatingColor(Math.round(details?.vote_average * 10) / 10)
            }`}
          >
            {isNaN(Math.round(details?.vote_average * 10) / 10)
              ? "N/A"
              : Math.round(details?.vote_average * 10) / 10}
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex justify-between text-sm">
            <span className="mr-2 text-gray-900 dark:text-slate-300">
              ({releaseDate ? releaseDate.substring(0, 4) : "N/A"})
            </span>

            <span className="text-gray-900 dark:text-slate-300">
              {props.type === "movie" ? runtime + "m" : "Seasons: " + seasons}
            </span>
          </div>

          <Bookmark></Bookmark>
        </div>
      </div>
    </div>
  );
}
