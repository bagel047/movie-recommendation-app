import "./App.css";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Library from "./pages/library/Library";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import WebFont from "webfontloader";
import Movie from "./pages/Movie";
import TVShow from "./pages/TVShow";
import Season from "./pages/Season";

export const LoginContext = createContext();

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins"],
      },
    });
  }, []);

  /* const [results, setResults] = useState([]);
  const [videos, setVideos] = useState({});

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/search/movie?query=Barbie&api_key=" +
        api_key
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResults(data.results);
        console.log(data.results);
      });
  }, []);

  useEffect(() => {
    results.forEach((movie) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzc0MTU3YzQ0MjU1N2JiZTIxN2U2MDFjNjk0MmUxZSIsIm5iZiI6MTcyMzgwNTczNS42NTM3LCJzdWIiOiI2NmJlMjViZjE4NzIwY2EwMTVlMTQ1NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5zYra2ecqEupqQjGmAvOHL3Av376cHFQ7otAGXUaFnQ`,
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setVideos((prevVideos) => ({
            ...prevVideos,
            [movie.id]: data.results[0],
          }));
        });
    });
  }, [results]);
  */

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/tv/:id" element={<TVShow />} />
            <Route path="/tv/:tvID/season/:seasonID" element={<Season />} />
            <Route path="/library" element={<Library></Library>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
    /*
    <div>
      {results
        ? results.map((movie) => {
            return (
              <div>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                ></img>
                <h1>{movie.title}</h1>
                <p>Description: {movie.overview}</p>
                <div>
                  {videos[movie.id] ? (
                    <div>
                      <h3>Trailer:</h3>
                      <p>{videos[movie.id].name}</p>
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${
                          videos[movie.id].key
                        }`}
                        title={videos[movie.id].name}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })
        : null}
    </div>
    */
  );
}

export default App;
