import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { options } from "../shared";
import StarRating from "../components/StarRating";
import Bookmark from "../components/Bookmark";
import Heart from "../components/Heart";
import TrailerButton from "../components/TrailerButton";
import PersonCard from "../components/PersonCard";
import Review from "../components/Review";
import MovieSlider from "../components/MovieSlider";
import { parse, format } from "date-fns";
import PopupMessage from "../components/PopupMessage";
import profile_placeholder from "../assets/images/profile-placeholder.png";
import movie_placeholder from "../assets/images/movie-placeholder.png";
import NotFound from "../components/NotFound";

export default function Movie() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [credits, setCredits] = useState({});
  const [reviews, setReviews] = useState([]);

  const [runtime, setRuntime] = useState("");
  const [releaseDate, setReleaseDate] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos%2Creviews%2Crecommendations%2Ccredits&language=en-US`,
      options
    )
      .then((response) => {
        if (response.status === 404) {
          navigate("/404");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDetails(data);
        setVideos(data.videos.results);
        setCredits(data.credits);
        setReviews(data.reviews.results);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    // trailer key
    let url = "";
    let hasTrailer = false;
    if (videos && videos.length > 0) {
      for (let video of videos) {
        if (video.name.toLowerCase().includes("official trailer")) {
          url = video.key;
          hasTrailer = true;
          break;
        } else if (video.name.toLowerCase().includes("trailer")) {
          url = video.key;
          hasTrailer = true;
        }
      }
      if (!hasTrailer) url = videos[0].key;
      setTrailerKey(url);
    }

    // runtime format in hours, minutes
    if (details.runtime) {
      let hours = Math.floor(details.runtime / 60);
      let minutes = details.runtime % 60;
      setRuntime(`${hours}h ${minutes}m`);
    }

    // release date format
    if (details.release_date) {
      const date = parse(details.release_date, "yyyy-MM-dd", new Date());
      setReleaseDate(format(date, "dd/MM/yyyy"));
    }
  }, [details, videos]);

  const backdropUrl = details?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : movie_placeholder;

  const posterUrl = details?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${details.poster_path}`
    : movie_placeholder;

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

  const [isExpanded, setIsExpanded] = useState(false);
  const overviewLimit = 280;

  return (
    <>
      {details ? (
        <>
          <PopupMessage />
          <div className="w-full relative">
            <img
              src={backdropUrl}
              className="h-[720px] w-full object-cover mix-blend-overlay"
            ></img>

            <div className="absolute top-0 left-0 w-full h-[720px] flex flex-wrap justify-center items-center bg-gradient-to-r from-zinc-950 to-transparent md:px-48 lg:px-48 sm:px-4">
              <div className="md:w-1/3 lg:w-1/3 p-2">
                <img
                  src={posterUrl}
                  alt={`${details.title} Poster`}
                  className="w-full md:h-auto"
                ></img>
              </div>

              <div className="md:w-2/3 lg:w-2/3 sm:w-full p-2">
                <h1 className="font-bold text-6xl">{details.title}</h1>
                <div className="flex gap-2.5 text-sm text-zinc-300">
                  <span className="inline-block">
                    &middot; {releaseDate ? releaseDate : ""}
                  </span>
                  <span className="inline-block">
                    &middot;{" "}
                    {details.genres && details.genres.length > 0
                      ? details.genres.map((genre, i) => {
                          return `${genre.name}${
                            i + 1 != details.genres.length ? ", " : ""
                          }`;
                        })
                      : "Genres not available"}
                  </span>
                  <span className="inline-block">
                    &middot; {runtime ? runtime : "N/A"}
                  </span>
                </div>
                <div className="mt-4 text-justify">
                  <p>
                    {details.overview ? (
                      <>
                        <span className="block font-semibold">Overview</span>
                        <span className="text-sm">
                          {isExpanded
                            ? details.overview
                            : details.overview.slice(0, overviewLimit) +
                              (details.overview.length > overviewLimit
                                ? "..."
                                : "")}
                          {details.overview.length > overviewLimit && (
                            <span
                              onClick={() => setIsExpanded(!isExpanded)}
                              className="inline-block text-white hover:underline hover:cursor-pointer pl-1"
                            >
                              {isExpanded ? " show less" : " show more"}
                            </span>
                          )}
                        </span>
                      </>
                    ) : (
                      "Overview not available for this movie."
                    )}
                  </p>

                  <div className="flex items-center mt-2.5 mb-5">
                    <StarRating rating={details?.vote_average || 0} />

                    <span
                      title="Rating"
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded ms-3 ${
                        isNaN(Math.round(details?.vote_average * 10) / 10)
                          ? "bg-gray-200 text-gray-800 dark:bg-gray-300 dark:text-gray-800"
                          : getRatingColor(
                              Math.round(details?.vote_average * 10) / 10
                            )
                      }`}
                    >
                      {isNaN(Math.round(details?.vote_average * 10) / 10)
                        ? "N/A"
                        : Math.round(details?.vote_average * 10) / 10}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col w-fit border-l-2 px-1 mt-4 border-red-800">
                  <div>
                    <Heart type={"movie"} id={id}></Heart>
                  </div>
                  <div>
                    <Bookmark type={"movie"} id={id}></Bookmark>
                  </div>
                </div>

                <div className="mt-4">
                  <TrailerButton
                    trailerKey={trailerKey}
                    details={details}
                  ></TrailerButton>
                </div>
              </div>
            </div>
          </div>

          {/* Cast and Reviews section*/}
          <div className="w-full flex flex-col lg:flex-row gap-2 mt-4 justify-between">
            <div className="lg:w-3/4 w-full max-h-[22rem] bg-gradient-to-r from-zinc-950 to-zinc-900 px-6 py-8 rounded-md relative">
              <h2 className="text-lg mb-3 pl-3 tracking-wide">Cast</h2>
              {credits.cast && credits.cast.length > 0 ? (
                <div className="flex overflow-x-scroll scrollbar scroll-smooth whitespace-nowrap py-3">
                  {credits.cast.map((actor) => {
                    return <PersonCard key={actor.id} data={actor} />;
                  })}
                </div>
              ) : (
                <div className="pl-3 text-sm text-zinc-300 absolute top-24">
                  Cast is not available for this movie.
                </div>
              )}
            </div>
            <div className="lg:w-1/4 w-full max-h-[22rem] bg-zinc-900 px-6 py-8 rounded-md">
              <h2 className="text-lg mb-3 pl-3 tracking-wide">Reviews</h2>
              <div className="max-h-64 pr-2 flex flex-col scrollable-container overflow-y-auto scrollbar scroll-smooth whitespace-nowrap">
                {reviews.length > 0 ? (
                  reviews.map((review) => {
                    return <Review key={review.id} data={review} />;
                  })
                ) : (
                  <div>
                    {[...Array(2)].map((_, index) => (
                      <div
                        key={index}
                        className="mb-2.5 w-full h-36 bg-zinc-950 p-4 rounded-md animate-pulse"
                      >
                        <div className="flex gap-2 items-end mb-2.5">
                          <img
                            src={profile_placeholder}
                            className="w-6 h-6 rounded-full bg-zinc-700 opacity-20"
                          ></img>
                          <div className="w-28 h-2 bg-zinc-600"></div>
                        </div>
                        <div className="w-full h-2 mb-1 bg-zinc-700"></div>
                        <div className="w-52 h-2 mb-1 bg-zinc-700"></div>
                        <div className="w-60 h-2 mb-1 bg-zinc-700"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations section*/}
          <div className="w-full mt-4 px-6 py-8 rounded-md bg-gradient-to-br from-zinc-950 to-zinc-900">
            <h2 className="text-lg mb-4 tracking-wide pl-3 border-b border-zinc-800 pb-2.5">
              Recommendations based on{" "}
              <span className="font-semibold italic text-red-600">
                "{details.title}"
              </span>
            </h2>

            <MovieSlider
              name="Recommendations"
              category={`${id}/recommendations`}
              categoryFix={`${id}-recommendations`}
              type="movie"
            />
          </div>
        </>
      ) : null}
    </>
  );
}
