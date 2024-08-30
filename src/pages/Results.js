import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { options } from "../shared";
import Result from "../components/Result";

export default function Results() {
  const { filter, search } = useParams();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    console.log(filter, search);
  });

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/${filter}?query=${search}&include_adult=false&language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      })
      .catch((err) => console.error(err));
  }, [filter, search, page]);

  function handlePageClick(pageNumber) {
    setPage(pageNumber);
  }

  const pagesToShow = 3;
  const startPage = Math.max(1, page - pagesToShow);
  const endPage = Math.min(totalPages, page + pagesToShow);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="mt-2 mb-4 px-2 text-xs">
        <span className="text-zinc-300">Total results: {totalResults}</span>
        <span className="block ">Page: {page}</span>
      </div>
      <div className="flex flex-col">
        {results && results.length > 0
          ? results.map((result) => {
              const linkTo = result.media_type ? result.media_type : filter;
              return (
                <Link
                  key={result.id}
                  to={`/${linkTo}/${result.id}`}
                  className="no-underline text-white"
                >
                  <Result data={result} filter={filter} />
                </Link>
              );
            })
          : `No results found for: "${search}"${
              filter !== "multi" ? " Try removing filters." : ""
            }`}
      </div>

      {/* Pages */}
      <div className="flex justify-center mt-4">
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className={`mx-1 px-2 ${
                page === 1 ? "text-blue-800" : "text-white"
              }`}
            >
              1
            </button>
            {startPage > 2 && <span className="mx-1">...</span>}
          </>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={`mx-1 px-2 ${
              number === page
                ? "text-red-700 border-b-2 border-red-700 font-bold"
                : "text-white"
            }`}
          >
            {number}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="mx-1">...</span>}
            <button
              onClick={() => handlePageClick(totalPages)}
              className={`mx-1 px-2 ${
                page === totalPages ? "text-blue-800" : "text-white"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
