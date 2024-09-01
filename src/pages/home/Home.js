import MovieSlider from "./MovieSlider";
import background from "../../assets/images/background.jpg";
import { useEffect, useState } from "react";
import PopupMessage from "../../components/PopupMessage";

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
      <div className="font-poppins">
        <div className="relative mb-16">
          <img
            src={background}
            className="max-h-96 w-full object-cover mix-blend-overlay"
          ></img>
          <h1 className="absolute bottom-4 left-3 lg:bottom-8 lg:left-8 font-bold text-4xl">
            Discover and keep track of movies and TV shows in one place
          </h1>
        </div>

        <div className="mb-12 py-10 rounded-md bg-gradient-to-l from-zinc-950 to-zinc-900">
          <h2 className="text-xl mb-6 pl-10 text-red-600 tracking-wide font-semibold uppercase">
            Popular
          </h2>

          <h3 className="mt-3 text-base pl-10">Movies</h3>

          <MovieSlider name="Popular Movies" category="popular" type="movie" />

          <h3 className="mt-3 text-base pl-10">TV Shows</h3>
          <MovieSlider name="Popular TV Shows" category="popular" type="tv" />
        </div>

        {secondFetch && (
          <>
            <div className="mb-12 py-10 rounded-md bg-gradient-to-r from-zinc-950 to-zinc-900">
              <h2 className="text-xl mb-6 pl-10 text-red-600 tracking-wide font-semibold uppercase">
                Top Rated
              </h2>

              <h3 className="mt-3 text-base pl-10">Movies</h3>
              <MovieSlider name="Top Rated" category="top_rated" type="movie" />

              <h3 className="mt-3 text-base pl-10">TV Shows</h3>
              <MovieSlider name="Top Rated" category="top_rated" type="tv" />
            </div>

            <div className="mb-12 py-10 rounded-md bg-gradient-to-b from-zinc-950 to-zinc-900">
              <h2 className="text-xl mb-6 pl-10 text-red-600 tracking-wide font-semibold uppercase">
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
