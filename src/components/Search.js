import SearchDropdown from "./SearchDropdown";

export default function Search() {
  const handleSubmit = () => {
    console.log("handling submit");
  };

  return (
    <div
      onSubmit={handleSubmit}
      className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
    >
      <form className="max-w-lg mx-auto border border-zinc-600 rounded">
        <div className="flex">
          <SearchDropdown />

          <div className="relative md:min-w-96 lg:min-w-96 xl:min-w-96 2xl:w-96 sm:max-w-48">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-zinc-800 rounded-e-sm dark:focus:border-zinc-600 dark:focus:bg-zinc-800 dark:bg-zinc-800 dark:placeholder-zinc-400 dark:text-white"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-zinc-950 rounded-e-lg hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-zinc-600 focus:border-zinc-500 dark:bg-zinc-950 dark:hover:bg-zinc-700 "
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
