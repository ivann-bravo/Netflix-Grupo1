function MovieDetails({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="movie-details-overlay">
      <div 
        className="movie-details-background"
        style={{ backgroundImage: `url(${movie.portada})` }}
      />
      
      <div className="movie-details-content">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="movie-details-poster">
          <img src={movie.portada} alt={movie.titulo} />
        </div>

        <div className="movie-details-info">
          <h2>{movie.titulo}</h2>
          <p>{movie.año} | {movie.duracion} | {movie.edadMinima}+</p>
          <p>{movie.descripcionLarga}</p>
          <br></br>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Reparto:</strong> {movie.reparto.join(', ')}</p>
          <p><strong>Idiomas:</strong> {movie.idiomas.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
