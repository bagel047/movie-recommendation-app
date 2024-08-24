import { useState, useEffect, useRef } from "react";

export default function SearchDropdown() {
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

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleShow}
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-zinc-600 bg-zinc-800 rounded-s-sm hover:bg-zinc-200 focus:outline-none dark:bg-zinc-800 dark:hover:bg-zinc-600 dark:text-white dark:border-zinc-950"
          type="button"
        >
          All{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
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
            className="absolute z-10 divide-y divide-gray-100 rounded-sm shadow w-44 dark:bg-zinc-950"
          >
            <ul
              className="px-0 m-0 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <div className="divide divide-y divide-zinc-700 p-2">
                <div>
                  <li>
                    <a
                      href="#"
                      className="rounded-sm block px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white text-white no-underline"
                    >
                      All
                    </a>
                  </li>
                </div>
                <div>
                  <li>
                    <a
                      href="#"
                      className="rounded-sm block px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white text-white no-underline"
                    >
                      Movies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="rounded-sm block px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white text-white no-underline"
                    >
                      TV
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="rounded-sm block px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white text-white no-underline"
                    >
                      People
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="rounded-sm block px-4 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white text-white no-underline"
                    >
                      Keywords
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
