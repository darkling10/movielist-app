import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  async function fetchDataHandler() {
    setisLoading(true);
    seterror(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went Wrong!!");
      }
      const data = await response.json();
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setmovies(transformedData);
    } catch (error) {
      seterror(error.message);
    }
    setisLoading(false);
  }

  let content = <h1>Please Click Fetch Movies to get the data</h1>;

  if(isLoading){
    content = <h3>Loading . . . </h3>
  }else if(error){
    content = <h3>{error}</h3>
  }else if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
