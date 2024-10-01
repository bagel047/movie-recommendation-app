import MovieSlider from "../../components/MovieSlider";
import background from "../../assets/images/background1.jpg";
import { useEffect, useState } from "react";
import PopupMessage from "../../components/PopupMessage";
import popcorn_img from "../../assets/images/popcorn.png";

export default function Home() {
  const [secondFetch, setSecondFetch] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSecondFetch(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <PopupMessage />
      <div className="">
        <div
          className="mb-16 sm:flex sm:flex-wrap flex flex-col justify-end gap-2.5 h-96 px-3 py-2"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}
        >
          <h1 className="font-bold text-3xl lg:text-6xl inline-flex items-end">
            <span>
              <img src={popcorn_img} className="inline-block h-32 lg:h-44" />
            </span>
            <span className="tracking-[0.1em] lg:tracking-[0.15em] pb-2 text-zinc-100">
              ineRec
            </span>
          </h1>
          <h2 className="font-semibold text-3xl text-zinc-100 tracking-wide">
            Discover and keep track of movies and TV shows in one place
          </h2>
        </div>

        <div className="mb-12 py-8 px-6 rounded-md bg-gradient-to-br from-zinc-950 to-zinc-900">
          <h2 className="text-xl mb-4 pl-10 text-red-600 tracking-wide font-semibold uppercase border-b border-zinc-800 pb-2.5">
            Popular
          </h2>

          <h3 className="mt-10 mb-2.5 text-base pl-10">Movies</h3>

          <MovieSlider name="Popular Movies" category="popular" type="movie" />

          <h3 className="mt-10 mb-2.5 text-base pl-10">TV Shows</h3>
          <MovieSlider name="Popular TV Shows" category="popular" type="tv" />
        </div>

        {secondFetch && (
          <>
            <div className="mb-12 py-8 px-6 rounded-md bg-gradient-to-bl from-zinc-950 to-zinc-900">
              <h2 className="text-xl mb-4 pl-10 text-red-600 tracking-wide font-semibold uppercase border-b border-zinc-800 pb-2.5">
                Top Rated
              </h2>

              <h3 className="mt-10 mb-2.5 text-base pl-10">Movies</h3>
              <MovieSlider name="Top Rated" category="top_rated" type="movie" />

              <h3 className="mt-10 mb-2.5 text-base pl-10">TV Shows</h3>
              <MovieSlider name="Top Rated" category="top_rated" type="tv" />
            </div>

            <div className="py-8 px-6 rounded-md bg-gradient-to-br from-zinc-950 to-zinc-900">
              <h2 className="text-xl mb-4 pl-10 text-red-600 tracking-wide font-semibold uppercase border-b border-zinc-800 pb-2.5">
                In theaters
              </h2>
              <MovieSlider
                name="In theaters"
                category="now_playing"
                type="movie"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
