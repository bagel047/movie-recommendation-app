import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";

export default function List(props) {
  const [fetchedDetails, setFetchedDetails] = useState(new Set());
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    setFetchedDetails(new Set());
  }, []);

  function updateFetchedDetails(newValue) {
    setFetchedDetails(newValue);
  }

  const handleClick = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <div className={`${collapse ? "mb-0" : "mb-8"}`}>
        <button
          onClick={handleClick}
          className="mb-1 w-fit text-sm px-3 py-2 bg-zinc-950 bg-opacity-60 hover:bg-opacity-100 rounded-xl tracking-wide"
        >
          <svg
            className="w-2.5 h-2.5 inline-block mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>

          {props.name}
        </button>
        {!collapse ? (
          <div className="flex flex-wrap">
            {props.array?.map((id) => {
              return (
                <MovieCard
                  key={id}
                  id={id}
                  type={props.type}
                  setFetchedDetails={updateFetchedDetails}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
}
