import React, { useState, useEffect } from 'react';
import {saveInLocalStorage, getUsersFromStorage, addMovieToMiList, addMovieToRecord, removeMovieToList} from '../movieUpdater.js'
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import Footer from './Footer';
import MovieSlides from './MovieSlides';
import moviesData from '../data/movies.json';

saveInLocalStorage()

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favouriteGenre, setFavouriteGenre] = useState([])
  const [peliculasVistas, setPeliculasVistas] = useState([]);
  const [miLista, setMiLista] = useState([]);
  const [user, setUser] = useState([])
  const idUsuario = 3

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [randomMovies, setRandomMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getRandomMovies = (movies, count) => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    
    const users = getUsersFromStorage()
    const userIndex = users.findIndex((user) => user.id === idUsuario)
    setUser(users[userIndex])

    // Lista de movies que incluyen el genero fav del usuario
    const filtrarGenerosFavoritos = ()  => {
      const generosFavoritos = movies.filter(movie =>
         movie.genero.some(genre => user.genre.includes(genre)) )
      setFavouriteGenre(generosFavoritos)
    }

    setMovies(moviesData);
    setPeliculasVistas(user.record)
    setMiLista(user.miList)
    setRandomMovies(getRandomMovies(moviesData, 20)); // Generar 20 películas aleatorias una vez
    filtrarGenerosFavoritos()
  }, [movies, idUsuario]); // Este efecto se ejecuta solo una vez cuando la página se carga

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const agregarAHistorial = (movie) => {
    if (!peliculasVistas.some(pelicula => pelicula.id === movie.id)) {
      addMovieToRecord(idUsuario, movie)
      setPeliculasVistas([...peliculasVistas, movie]);
    }
  };

  const agregarAMiLista = (movie) => {
    if (!miLista.some(pelicula => pelicula.id === movie.id)) {
      addMovieToMiList(idUsuario, movie)
      setMiLista([...miLista, movie]);
    }
  };

  const eliminarDeMiLista = (movie) => {
    removeMovieToList(idUsuario, movie)
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


  const categories = [
    { name: "Basado en tus Generos Favoritos", movies: favouriteGenre },
    { name: "Tendencias", movies: movies.slice(0, 12) },
    { name: "Populares en Netflix", movies: movies.slice(8, 20) },
    { name: "Slide Aleatorio", movies: randomMovies },
    { name: "Historial", movies: peliculasVistas? peliculasVistas : [] },
    { name: "Mi Lista", movies: miLista? miLista:[] }
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
          <span className="user-greeting">Hola, {user.name}</span>
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
        <MovieSlides categories={categories} handleMovieClick={handleMovieClick}/>
      )
      }

      <MovieDetails
        movie={selectedMovie}
        onClose={handleCloseDetails}
        onAddToWatched={agregarAHistorial}
        addToList={agregarAMiLista}
        eliminar={eliminarDeMiLista}
        isInMyList={selectedMovie ? miLista.some(m => m.id === selectedMovie.id) : false}
      />

      <Footer />
    </div>
  );
}


export default MovieList;