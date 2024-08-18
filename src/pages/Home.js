import { useEffect } from "react";
import { options } from "../shared";

export default function Home() {
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <>
      <div></div>
    </>
  );
}
