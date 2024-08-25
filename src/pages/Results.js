import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { options } from "../shared";
import Result from "../components/Result";

export default function Results() {
  const { filter, search } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(filter, search);
  });

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/${filter}?query=${search}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setResults(data.results);
      })
      .catch((err) => console.error(err));
  }, [filter, search]);

  return (
    <>
      <div className="flex flex-col">
        {results && results.length > 0
          ? results.map((result) => {
              return (
                <Link
                  key={result.id}
                  to={`/${result.media_type}/${result.id}`}
                  className="no-underline text-white"
                >
                  <Result data={result} filter={filter} />
                </Link>
              );
            })
          : `No results found for: "${search}"`}
      </div>
    </>
  );
}
