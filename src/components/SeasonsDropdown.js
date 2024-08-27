import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function SeasonsDropdown(props) {
  const [seasons, setSeasons] = useState(props.seasons);
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const toggleShow = () => {
    setShow(!show);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (props.seasons && props.seasons[0]?.name === "Specials") {
      setSeasons(props.seasons.slice(1) || []);
    } else {
      setSeasons(props.seasons);
    }
  }, [props.seasons]);

  useEffect(() => {
    console.log(seasons);
  }, [seasons]);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleShow}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-center text-sm bg-red-800 hover:bg-red-900 px-6 py-3 inline-block rounded-3xl"
          type="button"
        >
          Seasons{" "}
          <svg
            className="w-2.5 h-2.5 ms-3 inline-block"
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
        </button>

        {show ? (
          <div
            id="dropdown"
            className="mt-1 absolute z-10 rounded-md shadow w-44 max-h-48 overflow-y-scroll scrollbar bg-zinc-700 bg-opacity-70 border-1 border-black"
          >
            <ul
              className="px-0 m-0 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <div className="divide divide-y divide-black">
                {seasons && seasons.length > 0
                  ? seasons.map((season, index) => {
                      return (
                        <Link
                          to={`/tv/${props.tvID}/season/${index + 1}`}
                          key={index + 1}
                          className="no-underline"
                        >
                          <li className="rounded-md block px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-950 dark:hover:text-white text-white">
                            Season {index + 1}
                          </li>
                        </Link>
                      );
                    })
                  : null}
              </div>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
