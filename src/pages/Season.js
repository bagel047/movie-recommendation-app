import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { options } from "../shared";
import StarRating from "../components/StarRating";
import TrailerButton from "../components/TrailerButton";
import { parse, format } from "date-fns";
import Episode from "../components/Episode";
import movie_placeholder from "../assets/images/movie-placeholder.png";

export default function Season() {
  const { tvID, seasonID } = useParams();
  const [tvShow, setTvShow] = useState("");
  const [backdrop, setBackdrop] = useState("");
  const [seasonDetails, setSeasonDetails] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [firstAirDate, setFirstAirDate] = useState("");
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // fetch tv show details
    fetch(`https://api.themoviedb.org/3/tv/${tvID}?&language=en-US`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTvShow(data.name);
        setBackdrop(data.backdrop_path);
      })
      .catch((error) => console.error(error));

    // fetch season details
    fetch(
      `https://api.themoviedb.org/3/tv/${tvID}/season/${seasonID}?append_to_response=videos&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSeasonDetails(data);
        setEpisodes(data.episodes);

        // set trailer key
        let key = "";
        if (data.videos.results && data.videos.results.length > 0) {
          for (let video of data.videos.results) {
            if (video.name.toLowerCase().includes("trailer")) {
              key = video.key;
              break;
            } else {
              key = video.key;
            }
          }
          setTrailerKey(key);
        }

        // format first air date
        if (data.air_date) {
          const date = parse(data.air_date, "yyyy-MM-dd", new Date());
          setFirstAirDate(format(date, "dd/MM/yyyy"));
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const backdropUrl = backdrop
    ? `https://image.tmdb.org/t/p/original${backdrop}`
    : "";

  const posterUrl = seasonDetails?.poster_path
    ? `https://image.tmdb.org/t/p/w500${seasonDetails.poster_path}`
    : movie_placeholder;

  const [isExpanded, setIsExpanded] = useState(false);
  const overviewLimit = 280;

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
    <>
      <div
        className="w-full h-fit"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full sm:h-fit lg:h-[660px] flex flex-wrap gap-2.5 lg:gap-0 justify-center items-center bg-gradient-to-r from-zinc-950 to-transparent px-3">
          <div className="p-2">
            <img
              src={posterUrl}
              alt={`${tvShow} Poster`}
              className="w-[350px] h-[500px]"
            ></img>
          </div>

          <div className="sm:w-full lg:w-2/3 p-2">
            <Link to={`/tv/${tvID}`} className="no-underline text-white">
              <h1 className="font-bold text-6xl">{tvShow}</h1>
            </Link>
            <h2 className="font-bold text-3xl text-red-800">
              Season {seasonID}
            </h2>
            <div className="sm:flex-col lg:flex lg:flex-row gap-3 text-sm text-zinc-300">
              <span className="block">
                &middot; First air date: {firstAirDate ? firstAirDate : ""}
              </span>
              <span className="block">
                &middot; Episodes:{" "}
                {episodes && episodes.length > 0 ? episodes.length : "N/A"}
              </span>
            </div>
            <div className="mt-4 text-justify">
              <p>
                {seasonDetails.overview ? (
                  <>
                    <span className="block font-bold text-lg">Overview</span>
                    <span className="text-sm">
                      {isExpanded
                        ? seasonDetails.overview
                        : seasonDetails.overview.slice(0, overviewLimit) +
                          (seasonDetails.overview.length > overviewLimit
                            ? "..."
                            : "")}
                      {seasonDetails.overview.length > overviewLimit && (
                        <span
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="inline-block text-white hover:underline hover:cursor-pointer pl-1"
                        >
                          {isExpanded ? " read less" : " read more"}
                        </span>
                      )}
                    </span>
                  </>
                ) : (
                  "Overview not available for this season."
                )}
              </p>

              <div className="flex items-center mt-2.5 mb-2.5">
                <StarRating rating={seasonDetails?.vote_average || 0} />

                <span
                  title="Rating"
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded ms-3 ${
                    isNaN(Math.round(seasonDetails?.vote_average * 10) / 10)
                      ? "bg-gray-200 text-gray-800 dark:bg-gray-300 dark:text-gray-800"
                      : getRatingColor(
                          Math.round(seasonDetails?.vote_average * 10) / 10
                        )
                  }`}
                >
                  {isNaN(Math.round(seasonDetails?.vote_average * 10) / 10)
                    ? "N/A"
                    : Math.round(seasonDetails?.vote_average * 10) / 10}
                </span>
              </div>
            </div>

            <div className="mb-2 mt-4 flex w-full items-center gap-2.5">
              <TrailerButton trailerKey={trailerKey}></TrailerButton>
            </div>
          </div>
        </div>
      </div>

      {episodes && episodes.length > 0
        ? episodes.map((episode) => {
            return <Episode data={episode} key={episode.episode_number} />;
          })
        : null}
    </>
  );
}
