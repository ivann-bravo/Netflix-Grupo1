import React, { useState, useEffect, useRef} from 'react';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import moviesData from '../data/movies.json';

function MovieList() {
  const [movies, setMovies] = useState([]); // Todas las películas
  const [selectedMovie, setSelectedMovie] = useState(null); // Película seleccionada
  const [randomMovies, setRandomMovies] = useState([]); // Películas aleatorias

  const scrollRefs = useRef([]); // ref para cada categoría -> usamos para el scroll

  const getRandomMovies = (movies, count) => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setMovies(moviesData);
    setRandomMovies(getRandomMovies(moviesData, 20)); // Generar 20 películas aleatorias una vez
  }, []); // Este efecto se ejecuta solo una vez cuando la página se carga

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); 
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null); 
  };

  const scrollLeft = (index) => {
    if (scrollRefs.current[index]) {
      scrollRefs.current[index].scrollBy({ left: -900, behavior: 'smooth' });
    }
  };

  const scrollRight = (index) => {
    if (scrollRefs.current[index]) {
      scrollRefs.current[index].scrollBy({ left: 900, behavior: 'smooth' });
    }
  };

  const categories = [
    { name: "Tendencias", movies: movies.slice(0, 12) },
    { name: "Populares en Netflix", movies: movies.slice(8, 20) },
    { name: "Volver a ver", movies: movies.slice(16, 20) },
    { name: "Slide Aleatorio", movies: randomMovies }
  ];

  return (
    <div>
      {categories.map((categorie, index) => (
        <section key={index} class="categorie-slider">
          <h2>{categorie.name}</h2>
          
          <div class="categorie-scroll">
            <button onClick={() => scrollLeft(index)} className="scroll-button">◀</button>

            <section className="movie-list" ref={el => scrollRefs.current[index] = el}>
              {categorie.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
              ))}
            </section>

            <button onClick={() => scrollRight(index)} className="scroll-button">▶</button>
          </div>
        </section>
      ))}
      <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
    </div>
  );
}

export default MovieList;