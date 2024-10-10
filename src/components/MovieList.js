import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import Footer from './Footer';
import moviesData from '../data/movies.json';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [peliculasVistas, setPeliculasVistas] = useState([]);
  const [miLista, setMiLista] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [randomMovies, setRandomMovies] = useState([]);
  const scrollRefs = useRef([]);
  const [isSearching, setIsSearching] = useState(false);

  const getRandomMovies = (movies, count) => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setMovies(moviesData);
    setRandomMovies(getRandomMovies(moviesData, 20));
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const apeliculaVerLuego = (movie) => {
    if (!peliculasVistas.some(pelicula => pelicula.id === movie.id)) {
      setPeliculasVistas([...peliculasVistas, movie]);
    }
  };

  const agregarAMiLista = (movie) => {
    if (!miLista.some(pelicula => pelicula.id === movie.id)) {
      setMiLista([...miLista, movie]);
    }
  };

  const eliminarDeMiLista = (movie) => {
    setMiLista(miLista.filter(item => item.id !== movie.id));
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const buscarPelicula = (term) => {
    return movies.filter(movie =>
      movie.titulo.toLowerCase().includes(term.toLowerCase()) ||
      movie.genero.some(genero => genero.toLowerCase().includes(term.toLowerCase())) ||
      movie.reparto.some(actor => actor.toLowerCase().includes(term.toLowerCase()))
    );
  };

  const handleLogoClick = () => {
    setFilteredMovies([]);
    setSearchTerm('');
    setIsSearching(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm !== '') {
      setFilteredMovies(buscarPelicula(searchTerm));
      setIsSearching(true);
    }
  };

  const handleChange = (event) => {
    const search = event.target.value;
    setSearchTerm(search);
    if (search === '') {
      setFilteredMovies([]);
      setIsSearching(false);
    }
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
    { name: "Slide Aleatorio", movies: randomMovies },
    { name: "Historial", movies: peliculasVistas },
    { name: "Mi Lista", movies: miLista }
  ];

  return (
    <div>
      <header className="App-header">
        <div className="header-left">
          <img
            src={process.env.PUBLIC_URL + '/netflix-logo.png'}
            alt="Netflix Logo"
            className="netflix-logo"
            onClick={handleLogoClick}
          />
        </div>
        <div className="header-center">
          <form className='form' onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={searchTerm}
              placeholder="Buscar por título, género o actor..."
            />
            <button type='submit'>Buscar</button>
          </form>
        </div>
        <div className="header-right">
          <span className="user-greeting">Hola, Usuario</span>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      {isSearching ? (
        <div className="search-results">
          <h2>Resultados de búsqueda</h2>
          <div className="search-results-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
            ))}
          </div>
        </div>
      ) : (
        categories.map((category, index) => {
          return (
            category.movies.length ? (
              <div className="categorie-slider" key={index}>
                <h2>{category.name}</h2>
                <div className="categorie-scroll">
                  <button onClick={() => scrollLeft(index)} className="scroll-button">◀</button>
                  <section className="movie-list" ref={el => scrollRefs.current[index] = el}>
                    {category.movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
                    ))}
                  </section>
                  <button onClick={() => scrollRight(index)} className="scroll-button">▶</button>
                </div>
              </div>
            ) : null
          );
        })
      )}

      <MovieDetails
        movie={selectedMovie}
        onClose={handleCloseDetails}
        onAddToWatched={apeliculaVerLuego}
        addToList={agregarAMiLista}
        eliminar={eliminarDeMiLista}
        isInMyList={selectedMovie ? miLista.some(m => m.id === selectedMovie.id) : false}
      />

      <Footer />
    </div>
  );
}

export default MovieList;