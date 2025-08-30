import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return <p className="text-center text-xl mt-10">No movies found </p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
