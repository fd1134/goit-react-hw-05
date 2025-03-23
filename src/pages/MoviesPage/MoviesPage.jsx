import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../utils/moviesApi";
import { useSearchParams } from "react-router-dom";
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query");
    const movieSearch = async () => {
      try {
        setMovies([]);
        setLoading(true);
        const data = await fetchMovies(
          "search",
          "search/movie?include_adult=false&language=en-US&page=1",
          query
        );
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      movieSearch();
    }
  }, [searchParams]);

  const handleOnSubmit = async (evnt) => {
    evnt.preventDefault();
    const frm = evnt.target;
    const inpt = frm.elements.search;
    const query = inpt.value.trim();
    if (query) {
      setSearchParams({ query });
    }

    frm.reset();
  };

  return (
    <>
      <form className={css.frm} onSubmit={handleOnSubmit}>
        <input type="text" name="search" className={css.inpt} />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
