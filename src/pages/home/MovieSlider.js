import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { options } from "../../shared";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import MovieCard from "../../components/MovieCard";

export default function MovieSlider(props) {
  const [results, setResults] = useState([]);
  const [fetchedDetails, setFetchedDetails] = useState(new Set());
  let [clicks, setClicks] = useState(0);
  let [page, setPage] = useState(1);

  // Fetch page of results
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${props.type}/${
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

  function updateFetchedDetails(newValue) {
    setFetchedDetails(newValue);
  }

  const slideLeft = () => {
    const sliderId = `slider-${props.category}-${props.type}`;
    const slider = document.querySelector(`#${sliderId}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    const sliderId = `slider-${props.category}-${props.type}`;
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
        <div className="divide-y divide-zinc-600">
          {/* <h2 className="mb-3 font-semibold text-lg">{props.name}</h2> */}

          <div className="flex justify-between bg-zinc-900 shadow-lg shadow-zinc-900 pt-1 pb-1 rounded-sm">
            <ChevronLeftIcon
              onClick={slideLeft}
              className="size-12 self-center opacity-50 hover:opacity-100 cursor-pointer stroke-3 bg-zinc-950 p-2 rounded-xl"
            ></ChevronLeftIcon>
            <div
              id={`slider-${props.category}-${props.type}`}
              className="p-5 w-full h-full overflow-x-scroll scroll scroll-smooth whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
            >
              {results.map((movie) => {
                return (
                  <Link to={"/movie/" + movie.id} key={movie.id}>
                    <MovieCard
                      data={movie}
                      type={props.type}
                      setFetchedDetails={updateFetchedDetails}
                    />
                  </Link>
                );
              })}
            </div>
            <ChevronRightIcon
              id="right"
              onClick={slideRight}
              className="size-12 self-center opacity-50 hover:opacity-100 cursor-pointer stroke-3 bg-zinc-950 p-2 rounded-xl ml-2"
            ></ChevronRightIcon>
          </div>
        </div>
      ) : null}
    </>
  );
}
