import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { options } from "../../shared";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import MovieCard from "../../components/MovieCard";

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
        console.log(data, props.category);
        let temp = [...results];
        data.results.forEach((result) => {
          if (!fetchedDetails.has(result.id)) {
            temp.push(result);
          }
        });
        // console.log(temp);
        setResults(temp);
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
        <div className="">
          {/* <h2 className="mb-3 font-semibold text-lg">{props.name}</h2> */}

          <div className="flex justify-between">
            <ChevronLeftIcon
              onClick={slideLeft}
              className="size-10 self-center opacity-50 hover:opacity-100 cursor-pointer stroke-3 p-1"
            ></ChevronLeftIcon>
            <div
              id={`slider-${categoryFix != null ? categoryFix : category}-${
                props.type
              }`}
              className="p-3 w-full h-full overflow-x-scroll scroll-smooth whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
            >
              {results.map((movie) => {
                return (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    type={props.type}
                    setFetchedDetails={updateFetchedDetails}
                  />
                );
              })}
            </div>
            <ChevronRightIcon
              id="right"
              onClick={slideRight}
              className="size-10 self-center opacity-50 hover:opacity-100 cursor-pointer stroke-3 p-1"
            ></ChevronRightIcon>
          </div>
        </div>
      ) : null}
    </>
  );
}
