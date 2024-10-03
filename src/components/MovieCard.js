import React from 'react';

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={movie.portada} alt={movie.titulo} />
      <h2>{movie.titulo}</h2>
      <p>{movie.duracion}</p>
    </div>
  );
}

export default MovieCard;