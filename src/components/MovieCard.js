import React from 'react';

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img src={movie.portada} alt={movie.titulo} />
      <h3>{movie.titulo}</h3>
      <p>{movie.duracion}</p>
    </div>
  );
}

export default MovieCard;