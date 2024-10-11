import MovieCard from "./MovieCard";
import { useRef } from "react";
function MovieSlides({ categories, handleMovieClick }) {
  const scrollRefs = useRef([]); // ref para cada categoría -> usamos para el scroll

  const scrollLeft = (index) => {
    if (scrollRefs.current[index]) {
      scrollRefs.current[index].scrollBy({ left: -900, behavior: "smooth" });
    }
  };

  const scrollRight = (index) => {
    if (scrollRefs.current[index]) {
      scrollRefs.current[index].scrollBy({ left: 900, behavior: "smooth" });
    }
  };

  return categories.map((category, index) => {
    return category.movies.length ? (
      <div className="categorie-slider" key={index}>
        <h2>{category.name}</h2>
        <div className="categorie-scroll">
          <button onClick={() => scrollLeft(index)} className="scroll-button">
            ◀
          </button>
          <section
            className="movie-list"
            ref={(el) => (scrollRefs.current[index] = el)}
          >
            {category.movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} onClick={handleMovieClick} />
            ))}
          </section>
          <button onClick={() => scrollRight(index)} className="scroll-button">
            ▶
          </button>
        </div>
      </div>
    ) : null;
  });
}

export default MovieSlides;
