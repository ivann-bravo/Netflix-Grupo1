import React, { useState } from 'react';

function MovieDetails({ movie, onClose }) {
  const [showTrailer, setShowTrailer] = useState(false);

  if (!movie) return null;

  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="movie-details-overlay">
      <div 
        className="movie-details-background"
        style={{ backgroundImage: `url(${movie.portada})` }}
      />
      
      <div className="movie-details-content">
        {!showTrailer && <button className="close-button" onClick={onClose}>×</button>}

        {!showTrailer && (
          <>
            <div className="movie-details-poster">
              <img src={movie.portada} alt={movie.titulo} />
            </div>

            <div className="movie-details-info">
              <h2>{movie.titulo}</h2>
              <p>{movie.año} | {movie.duracion} | {movie.edadMinima}+</p>
              <p>{movie.descripcionLarga}</p>
              <br />
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Reparto:</strong> {movie.reparto.join(', ')}</p>
              <p><strong>Idiomas:</strong> {movie.idiomas.join(', ')}</p>
              <br />
              {movie.trailer && (
                <button className="trailer-button" onClick={toggleTrailer}>
                  ▶ Reproducir
                </button>
              )}
            </div>
          </>
        )}

        {showTrailer && movie.trailer && (
          <div className="trailer-wrapper">
            <div className="trailer-container">
              <iframe
                src={getYouTubeEmbedUrl(movie.trailer)}
                title={`${movie.titulo} Trailer`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button className="close-trailer-button" onClick={toggleTrailer}>
            Volver atrás
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;