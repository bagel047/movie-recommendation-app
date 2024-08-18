import { useEffect, useState } from "react";
import { options } from "../shared";
import background from "../assets/images/background.jpg";
import Bookmark from "../components/Bookmark";
import StarRating from "../components/StarRating";

export default function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [details, setDetails] = useState({});

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
          console.log(data);
          setDetails((prev) => ({
            ...prev,
            [movie.id]: { data },
          }));
        });
    });
  }, [nowPlaying]);

  return (
    <>
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
          <h2 className="mb-3 font-bold text-2xl">Now Playing</h2>

          <div className="flex justify-between">
            {nowPlaying.map((movie) => {
              return (
                <>
                  <div
                    key={movie.id}
                    class="mt-3 mr-8 min-w-52 h-fit bg-zinc-900"
                  >
                    <a href="#">
                      <img
                        className="rounded-t-sm h-[300px] w-full"
                        src={
                          "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        }
                        alt={movie.title + " Poster"}
                      />
                    </a>
                    <div class="">
                      <a href="#">
                        <h5 class="pt-3 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                          {movie.title}
                        </h5>
                      </a>
                      <div class="flex items-center mt-2.5 mb-5">
                        <StarRating
                          rating={details[movie.id]?.data.vote_average || 0}
                        />

                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                          {Math.round(
                            details[movie.id]?.data.vote_average * 10
                          ) / 10}
                        </span>
                      </div>
                      <div class="flex items-end justify-between">
                        <div className="flex justify-between">
                          <span class="mr-2 text-sm text-gray-900 dark:text-slate-300">
                            ({movie.release_date.substr(0, 4)})
                          </span>

                          <span class="text-sm text-gray-900 dark:text-slate-300">
                            {details[movie.id]?.data.runtime}m
                          </span>
                        </div>

                        <Bookmark></Bookmark>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
