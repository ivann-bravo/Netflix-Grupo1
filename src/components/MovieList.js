import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import moviesData from '../data/movies.json';

function MovieList() {
  const [movies, setMovies] = useState([]); // Todas las películas
  const [moviesConFiltro, setMoviesConFiltro] = useState([]) // P. filtradas por titulo
  const [tituloBuscado, setTituloBuscado] = useState('') // Pelicula a buscar

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

  const buscarPelicula = ({ tituloBuscado }) => {
    return movies.filter(movie =>
      movie.titulo.toLowerCase().includes(tituloBuscado.toLowerCase()));
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(tituloBuscado !== '')
    setMoviesConFiltro(buscarPelicula({ tituloBuscado }))
  }

  const handleChange = (event) => {
    const search = event.target.value
    if (search === '') setMoviesConFiltro('')
    setTituloBuscado(search)
  }

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

  const busqueda = [
    { name: "Resultado", movies: moviesConFiltro }
  ]

  const categories = [
    { name: "Tendencias", movies: movies.slice(0, 12) },
    { name: "Populares en Netflix", movies: movies.slice(8, 20) },
    { name: "Volver a ver", movies: movies.slice(16, 20) },
    { name: "Slide Aleatorio", movies: randomMovies },
    { name: "Mi lista", movies: [] }
  ];

  return (
    <div>

      <header className="App-header">
        <h1>Netflix Grupo 1</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={tituloBuscado}
            placeholder="Coco, Forrest Gump, Inception.." />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      {
        moviesConFiltro !== '' ? (
          busqueda.map((category, index) => (
            <div key={index}>
              <h2 style={{ marginLeft: '4rem', color: '#e5e5e5' }}>Resultados</h2>

              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <button onClick={() => scrollLeft(index)} className="scroll-button">◀</button>

                <section className="movie-list" ref={el => scrollRefs.current[index] = el}>
                  {category.movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
                  ))}
                </section>

                <button onClick={() => scrollRight(index)} className="scroll-button">▶</button>
              </div>
            </div>
          ))
        ) : (
          categories.map((category, index) => (
            <div key={index}>
              <h2 style={{ marginLeft: '4rem', color: '#e5e5e5' }}>{category.name}</h2>

              <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <button onClick={() => scrollLeft(index + 1)} className="scroll-button">◀</button>

                <section className="movie-list" ref={el => scrollRefs.current[index + 1] = el}>
                  {category.movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
                  ))}
                </section>

                <button onClick={() => scrollRight(index + 1)} className="scroll-button">▶</button>
              </div>
            </div>
          ))
        )
      }

      <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
    </div>
  );
}

export default MovieList;