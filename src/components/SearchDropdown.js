import { useState, useEffect, useRef } from "react";

export default function SearchDropdown(props) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("All");
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
    console.log(category);
  }, [category]);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleShow}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="max-w-28 min-w-28 flex-shrink-0 z-10 inline-flex justify-center items-center gap-1 py-2.5 px-3 text-xs font-medium text-center text-zinc-600 bg-zinc-800 rounded-s-md hover:bg-zinc-200 focus:outline-none dark:bg-zinc-900 dark:hover:bg-zinc-600 dark:text-white border-1 border-zinc-800"
          type="button"
        >
          <svg
            className="w-2.5 h-2.5 inline-block"
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
          {category}{" "}
        </button>

        {show ? (
          <div
            id="dropdown"
            className="absolute z-10 rounded-b-md shadow w-44 dark:bg-zinc-950 dark:bg-opacity-90 py-2.5"
          >
            <ul
              className="px-0 m-0 text-xs text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <div className="divide divide-y divide-zinc-600">
                <div>
                  <li>
                    <a
                      onClick={() => {
                        setCategory("All");
                        props.updateSearchFilter("multi");
                        toggleShow();
                      }}
                      href="#"
                      className="block px-6 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white text-white no-underline"
                    >
                      All
                    </a>
                  </li>
                </div>
                <div>
                  <li>
                    <a
                      onClick={() => {
                        setCategory("Movies");
                        props.updateSearchFilter("movie");
                        toggleShow();
                      }}
                      href="#"
                      className="block px-6 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white text-white no-underline"
                    >
                      Movies
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setCategory("TV");
                        props.updateSearchFilter("tv");
                        toggleShow();
                      }}
                      href="#"
                      className="block px-6 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white text-white no-underline"
                    >
                      TV
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        setCategory("People");
                        props.updateSearchFilter("person");
                        toggleShow();
                      }}
                      href="#"
                      className="block px-6 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white text-white no-underline"
                    >
                      People
                    </a>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        ) : null}
      </div>
    </>
  );
}
