import MovieSlider from "./MovieSlider";
import background from "../../assets/images/background.jpg";

export default function Home() {
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

            <MovieSlider name="Popular Movies" category="popular" type="movie"></MovieSlider>
            <MovieSlider name="Top Rated" category="top_rated" type="movie"></MovieSlider>
            <MovieSlider name="In theaters" category="now_playing" type="movie"></MovieSlider>
            <MovieSlider name="Popular TV Shows" category="popular" type="tv"></MovieSlider>
        </div>
    );
}
