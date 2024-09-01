import { useEffect, useState } from "react";
import SearchDropdown from "./SearchDropdown";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [input, setInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("multi");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/results/${searchFilter}/${input}`);
  };

  function updateSearchFilter(newValue) {
    setSearchFilter(newValue);
  }

  useEffect(() => {
    console.log("in search: ", searchFilter);
    if (input != "") handleSubmit();
  }, [searchFilter]);

  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-8 lg:mr-4"
    >
      <form className="max-w-lg mx-auto">
        <div className="flex items-center">
          <SearchDropdown updateSearchFilter={updateSearchFilter} />

          <div className="relative md:min-w-96 lg:min-w-96 xl:min-w-96 2xl:w-96 sm:max-w-48">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="search"
              id="search"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-zinc-800 rounded-e-md dark:focus:border-zinc-600 dark:focus:bg-zinc-800 dark:bg-zinc-900 border-1 border-zinc-700 dark:placeholder-zinc-400 dark:text-white border-s-2 border-s-zinc-900"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-md hover:bg-zinc-700 focus:outline-none focus:border-zinc-500 dark:hover:bg-zinc-700"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
