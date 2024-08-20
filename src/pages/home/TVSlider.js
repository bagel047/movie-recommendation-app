import { useEffect, useState } from "react";
import { options } from "../../shared";
import Bookmark from "../../components/Bookmark";
import StarRating from "../../components/StarRating";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function TVSlider(props) {
  const [results, setResults] = useState([]);
  const [details, setDetails] = useState({});
  const [fetchedDetails, setFetchedDetails] = useState(new Set());
  let [clicks, setClicks] = useState(0);
  let [page, setPage] = useState(1);

  // Fetch page of results
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${
        props.category
      }?language=en-US&page=${page.toString()}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        let temp = [...results];
        data.results.forEach((result) => {
          if (!fetchedDetails.has(result.id)) {
            temp.push(result);
          }
        });
        // console.log(temp);
        setResults(temp);
      });
  }, [page]);

  //   Fetch movie details by movie id
  useEffect(() => {
    results.forEach((movie) => {
      if (!fetchedDetails.has(movie.id)) {
        fetch(
          `https://api.themoviedb.org/3/tv/${movie.id}?language=en-US`,
          options
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("tv", data);
            setDetails((prev) => ({
              ...prev,
              [movie.id]: { data },
            }));
            setFetchedDetails((prev) => new Set(prev).add(movie.id)); // Update fetched IDs
          });
      }
    });
  }, [results]);

  const slideLeft = () => {
    const sliderId = "slider-" + props.category;
    const slider = document.querySelector(`#${sliderId}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const sliderId = "slider-" + props.category;
    const slider = document.querySelector(`#${sliderId}`);
    slider.scrollLeft = slider.scrollLeft + 500;
    setClicks(clicks + 1);
  };

  useEffect(() => {
    if (clicks === 7) {
      setClicks(0);
      setPage(page + 1);
    }
  }, [clicks]);

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
      {results ? (
        <div className="mb-20 divide-y divide-zinc-600">
          <h2 className="mb-3 font-semibold text-xl">{props.name}</h2>

          <div className="flex justify-between bg-zinc-900 shadow-md shadow-zinc-950">
            <ChevronLeftIcon
              onClick={slideLeft}
              className="size-8 self-center opacity-50 hover:opacity-100 cursor-pointer stroke-2"
            ></ChevronLeftIcon>
            <div
              id={"slider-" + props.category}
              className="p-5 w-full h-full overflow-x-scroll scroll scroll-smooth whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
            >
              {results.map((movie) => {
                return (
                  <div
                    key={movie.id}
                    className="mr-3 w-56 h-fit bg-inherit inline-block snap-start hover:scale-[1.06] ease-in-out duration-150"
                  >
                    <div className="relative w-full overflow-hidden">
                      <a href="#">
                        <img
                          id="moviePoster"
                          className="rounded-t-sm aspect-video object-cover w-full h-full"
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            movie.poster_path
                          }
                          alt={movie.title + " Poster"}
                        />
                      </a>
                    </div>
                    <div className="w-full">
                      <a href="#">
                        <h5
                          className="pt-3 text-md text-white dark:text-white font-semibold truncate w-full overflow-hidden"
                          title={movie.name}
                        >
                          {movie.name}
                        </h5>
                      </a>
                      <div className="flex items-center mt-2.5 mb-5">
                        <StarRating
                          rating={details[movie.id]?.data.vote_average || 0}
                        />

                        <span
                          title="Rating"
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded ms-3 ${
                            isNaN(
                              Math.round(
                                details[movie.id]?.data.vote_average * 10
                              ) / 10
                            )
                              ? "bg-gray-200 text-gray-800 dark:bg-gray-300 dark:text-gray-800"
                              : getRatingColor(
                                  Math.round(
                                    details[movie.id]?.data.vote_average * 10
                                  ) / 10
                                )
                          }`}
                        >
                          {isNaN(
                            Math.round(
                              details[movie.id]?.data.vote_average * 10
                            ) / 10
                          )
                            ? "N/A"
                            : Math.round(
                                details[movie.id]?.data.vote_average * 10
                              ) / 10}
                        </span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="flex justify-between text-sm">
                          <span className="mr-2 text-gray-900 dark:text-slate-300">
                            ({movie.first_air_date.substr(0, 4)})
                          </span>

                          <span className="text-gray-900 dark:text-slate-300">
                            {details[movie.id]?.data.number_of_seasons
                              ? `Seasons: ${
                                  details[movie.id].data.number_of_seasons
                                }`
                              : "N/A"}
                          </span>
                        </div>

                        <Bookmark></Bookmark>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <ChevronRightIcon
              id="right"
              onClick={slideRight}
              className="size-8 self-center opacity-50 hover:opacity-100 cursor-pointer stroke-2"
            ></ChevronRightIcon>
          </div>
        </div>
      ) : null}
    </>
  );
}
