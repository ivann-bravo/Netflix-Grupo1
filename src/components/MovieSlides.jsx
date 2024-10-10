import MovieCard from "./MovieCard";
import { useRef } from "react";
function MovieSlides({categories, handleMovieClick}) {

    const scrollRefs = useRef([]); // ref para cada categoría -> usamos para el scroll

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

    return (
        categories.map((category, index) => {
          return (
            category.movies.length ? (
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
            ) : null
          );
        })
      )
}

export default MovieSlides