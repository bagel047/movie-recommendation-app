import { useCallback, useEffect, useState } from "react";
import { options } from "../shared";
import background from "../assets/images/background.jpg";
import Bookmark from "../components/Bookmark";
import StarRating from "../components/StarRating";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [details, setDetails] = useState({});
  let [clicks, setClicks] = useState(0);
  let [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNowPlaying(data.results);
      });
  }, []);

  useEffect(() => {
    nowPlaying.forEach((movie) => {
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
        });
    });
  }, [nowPlaying]);

  // Fetch +20 movies od Now Playing
  useEffect(() => {
    console.log(typeof page, page);
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page.toString()}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        let temp = [...nowPlaying];
        data.results.forEach((result) => {
          temp.push(result);
        });
        // console.log(temp);
        setNowPlaying(temp);
      });
  }, [page]);

  const slideLeft = () => {
    const slider = document.querySelector("#slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const slider = document.querySelector("#slider");
    slider.scrollLeft = slider.scrollLeft + 500;
    setClicks(clicks + 1);
  };

  useEffect(() => {
    console.log("in useeffect for clicks", clicks);
    if (clicks === 7) {
      setClicks(0);
      setPage(page + 1);
      console.log("7 clicks");
    }
  }, [clicks]);

  return (
    <div className="font-poppins">
      <div className="relative mb-32">
        <img
          src={background}
          className="max-h-96 w-full object-cover mix-blend-overlay"
        ></img>
        <h1 className="absolute bottom-8 left-8 font-bold text-4xl">
          Discover and keep track of movies and TV shows in one place
        </h1>
      </div>

      {nowPlaying ? (
        <div className="divide-y divide-zinc-600">
          <h2 className="mb-3 font-semibold text-xl">Now Playing</h2>

          <div className="flex justify-between bg-zinc-900 shadow-md shadow-zinc-950">
            <ChevronLeftIcon
              onClick={slideLeft}
              className="size-8 self-center opacity-50 hover:opacity-100 cursor-pointer stroke-2"
            ></ChevronLeftIcon>
            <div
              id="slider"
              className="p-5 w-full h-full overflow-x-scroll scroll scroll-smooth whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-contain snap-x snap-mandatory"
            >
              {nowPlaying.map((movie) => {
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
    </div>
  );
}
