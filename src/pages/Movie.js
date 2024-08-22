import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { options } from "../shared";
import StarRating from "../components/StarRating";
import BookmarkIcon from "../components/Bookmark";
import HeartIcon from "../components/Heart";
import TrailerButton from "../components/TrailerButton";
import PersonCard from "../components/PersonCard";
import Review from "../components/Review";

export default function Movie() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [images, setImages] = useState({});
  const [videos, setVideos] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [credits, setCredits] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos%2Creviews%2Crecommendations%2Ccredits&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDetails(data);
        setVideos(data.videos.results);
        setCredits(data.credits);
        setReviews(data.reviews.results);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options)
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      })
      .catch((err) => console.error(err));

    // trailer url
    if (videos) {
      videos.forEach((video) => {
        if (video.name === "Official Trailer") setTrailerUrl(video.key);
      });
    }
  }, [details, videos]);

  const backdropUrl =
    images.backdrops && images.backdrops.length > 0
      ? `https://image.tmdb.org/t/p/original${images.backdrops[0].file_path}`
      : "";

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
      <div className="w-full relative">
        <img src={backdropUrl} className="w-full mix-blend-overlay"></img>

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gradient-to-r from-zinc-950 to-transparent px-48">
          <div className="w-1/3 mr-6">
            <img
              src={`https://image.tmdb.org/t/p/w500/${
                images.posters ? images.posters[0].file_path : null
              }`}
              className="w-full h-auto"
            ></img>
          </div>

          <div className="w-2/3">
            <h1 className="font-bold text-7xl">{details.title}</h1>
            <div className="mt-4 text-justify">
              <p>
                <span className="block font-bold text-lg">Overview</span>
                <span className="text-sm">{details.overview}</span>
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

            <div className="flex flex-col w-fit border-l-2 px-2 mt-4 border-red-800">
              <div className="mb-1.5">
                <HeartIcon></HeartIcon>
              </div>
              <div>
                <BookmarkIcon></BookmarkIcon>
              </div>
            </div>

            <TrailerButton
              trailerUrl={trailerUrl}
              details={details}
            ></TrailerButton>
          </div>
        </div>
      </div>

      <div className="w-full flex mt-4 mb-12 justify-between">
        <div className="w-3/4 h-full bg-zinc-900 p-8 rounded-md">
          <h2 className="font-bold text-2xl text-red-600 mb-6">Cast</h2>

          <div className="h-full flex overflow-x-scroll scrollbar scroll-smooth whitespace-nowrap">
            {credits.cast
              ? credits.cast.map((actor) => {
                  return <PersonCard data={actor} />;
                })
              : "N/A"}
          </div>
        </div>
        <div className="w-1/4 ml-2 bg-zinc-900 p-8 rounded-md">
          <h2 className="font-bold text-2xl text-red-600 mb-6">Reviews</h2>
          <div className="max-h-64 pr-2 flex flex-col scrollable-container overflow-y-auto scrollbar scroll-smooth whitespace-nowrap">
            {reviews.length > 0 ? (
              reviews.map((review) => {
                return <Review data={review} />;
              })
            ) : (
              <span className="font-xs text-zinc-300">
                No reviews available
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
