import MovieSlider from "./MovieSlider";
import background from "../../assets/images/background.jpg";

export default function Home() {
  return (
    <div className="font-poppins">
      <div className="relative mb-16">
        <img
          src={background}
          className="max-h-96 w-full object-cover mix-blend-overlay"
        ></img>
        <h1 className="absolute bottom-8 left-8 font-bold text-4xl">
          Discover and keep track of movies and TV shows in one place
        </h1>
      </div>

      <div className="mb-12 bg-zinc-900 px-12 py-8 rounded-md divide divide-y divide-zinc-600">
        <h2 className="font-bold text-2xl text-red-600 mb-6">Popular</h2>

        <div className="mb-6">
          <h3 className="mt-3 font-semibold text-lg">Movies</h3>
          <MovieSlider name="Popular Movies" category="popular" type="movie" />
        </div>

        <div>
          <h3 className="mt-3 font-semibold text-lg">TV Shows</h3>
          <MovieSlider name="Popular TV Shows" category="popular" type="tv" />
        </div>
      </div>

      <div className="mb-12 bg-zinc-900 px-12 py-8 rounded-md divide divide-y divide-zinc-600">
        <h2 className="mb-2 font-bold text-2xl text-red-600 mb-6">Top Rated</h2>

        <div className="mb-6">
          <h3 className="mt-3 font-semibold text-lg">Movies</h3>
          <MovieSlider name="Top Rated" category="top_rated" type="movie" />
        </div>

        <div>
          <h3 className="mt-3 font-semibold text-lg">TV Shows</h3>
          <MovieSlider name="Top Rated" category="top_rated" type="tv" />
        </div>
      </div>

      <div className="mb-20 bg-zinc-900 px-12 py-8 rounded-md divide divide-y divide-zinc-600">
        <h2 className="mb-2 font-bold text-2xl text-red-600 mb-6">
          In theaters
        </h2>
        <MovieSlider name="In theaters" category="now_playing" type="movie" />
      </div>
    </div>
  );
}
