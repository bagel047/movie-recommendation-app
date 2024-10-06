import { useEffect, useState } from "react";
import { options } from "../shared";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import MovieCard from "./MovieCard";
import movie_placeholder from "../assets/images/movie-placeholder.png";

export default function MovieSlider(props) {
  const [category, setCategory] = useState(props.category);
  const [categoryFix, setCategoryFix] = useState(
    props.categoryFix ? props.categoryFix : null
  );

  const [results, setResults] = useState([]);
  const [fetchedDetails, setFetchedDetails] = useState(new Set());
  let [clicks, setClicks] = useState(0);
  let [page, setPage] = useState(1);

  useEffect(() => {
    setResults([]);
    setFetchedDetails(new Set());
    setPage(1);
    setClicks(0);
    setCategory(props.category);
    setCategoryFix(props.categoryFix);
  }, [props.category]);

  // fetch page of results
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${props.type}/${
        props.category
      }?language=en-US&page=${page.toString()}`,
      options
    )
      .then((response) => {
        if (response.status === 404) return;
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          let temp = [...results];
          data.results.forEach((result) => {
            if (!fetchedDetails.has(result.id)) {
              if (props.name !== "Recommendations-Library") {
                temp.push(result);
              } else {
                if (
                  !(result.id in props.favoriteMovies) &&
                  !(result.id in props.watchlistedMovies)
                ) {
                  temp.push(result);
                }
              }
            }
          });
          // console.log(temp);
          setResults(temp);
        }
      });
  }, [page, category]);

  function updateFetchedDetails(newValue) {
    setFetchedDetails(newValue);
  }

  const slideLeft = () => {
    const sliderId = `slider-${categoryFix != null ? categoryFix : category}-${
      props.type
    }`;
    const slider = document.querySelector(`#${sliderId}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const sliderId = `slider-${categoryFix != null ? categoryFix : category}-${
      props.type
    }`;
    const slider = document.querySelector(`#${sliderId}`);
    slider.scrollLeft = slider.scrollLeft + 500;
    setClicks(clicks + 1);
  };

  useEffect(() => {
    if (clicks === 6) {
      setClicks(0);
      setPage(page + 1);
    }
  }, [clicks]);

  return (
    <>
      {results ? (
        <div>
          <div className="flex justify-between">
            <ChevronLeftIcon
              onClick={slideLeft}
              className="h-10 w-10 self-center text-zinc-400 hover:text-white cursor-pointer stroke-3 p-1"
            ></ChevronLeftIcon>
            <div
              id={`slider-${categoryFix != null ? categoryFix : category}-${
                props.type
              }`}
              className="w-full h-full overflow-x-scroll scroll-smooth whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
            >
              {results.length > 0 ? (
                results.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    type={props.type}
                    setFetchedDetails={updateFetchedDetails}
                  />
                ))
              ) : (
                <div className="flex gap-2">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="w-56 h-60 bg-zinc-800 rounded-md animate-pulse"
                    >
                      <div className="pb-3">
                        <div className="relative w-full">
                          <img
                            className="aspect-video object-cover w-full h-full"
                            src={movie_placeholder}
                          />
                        </div>
                        <div className="px-2">
                          <h5 className="mt-2.5 mb-2 h-3 w-36 bg-zinc-600"></h5>
                          <p className="h-3 w-full bg-zinc-700"></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ChevronRightIcon
              id="right"
              onClick={slideRight}
              className="h-10 w-10 self-center text-zinc-400 hover:text-white cursor-pointer stroke-3 p-1"
            ></ChevronRightIcon>
          </div>
        </div>
      ) : null}
    </>
  );
}
