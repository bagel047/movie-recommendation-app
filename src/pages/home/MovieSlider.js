import { useEffect, useState } from "react";
import { options } from "../../shared";
import Bookmark from "../../components/Bookmark";
import StarRating from "../../components/StarRating";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function MovieSlider(props) {
  const [results, setResults] = useState([]);
  const [details, setDetails] = useState({});
  const [fetchedDetails, setFetchedDetails] = useState(new Set());
  let [clicks, setClicks] = useState(0);
  let [page, setPage] = useState(1);

  // Fetch page of results
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
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

  // Fetch movie details by movie id
  useEffect(() => {
    results.forEach((movie) => {
      if (!fetchedDetails.has(movie.id)) {
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
          options
        )
          .then((response) => response.json())
          .then((data) => {
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

  return (
    <>
      {results ? (
        <div className="divide-y divide-zinc-600">
          <h2 className="mb-3 font-semibold text-xl">{props.name}</h2>

          <div className="flex justify-between bg-zinc-900 shadow-md shadow-zinc-950">
            <ChevronLeftIcon
              onClick={slideLeft}
              className="size-8 self-center opacity-50 hover:opacity-100 cursor-pointer stroke-2"
            ></ChevronLeftIcon>
            <div
              id={"slider-" + props.category}
              className="p-5 w-full h-full overflow-x-scroll scroll scroll-smooth whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-contain snap-x snap-mandatory"
            >
              {results.map((movie) => {
                return (
                  <div
                    key={movie.id}
                    className="mr-3 w-56 h-fit bg-inherit inline-block snap-start"
                  >
                    <a href="#">
                      <img
                        className="rounded-t-sm aspect-video object-cover"
                        src={
                          "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        }
                        alt={movie.title + " Poster"}
                      />
                    </a>
                    <div className="w-full">
                      <a href="#">
                        <h5 className="pt-3 text-md text-white dark:text-white font-semibold truncate w-full overflow-hidden">
                          {movie.title}
                        </h5>
                      </a>
                      <div className="flex items-center mt-2.5 mb-5">
                        <StarRating
                          rating={details[movie.id]?.data.vote_average || 0}
                        />

                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
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
                            ({movie.release_date.substr(0, 4)})
                          </span>

                          <span className="text-gray-900 dark:text-slate-300">
                            {details[movie.id]?.data.runtime
                              ? details[movie.id].data.runtime + "m"
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
