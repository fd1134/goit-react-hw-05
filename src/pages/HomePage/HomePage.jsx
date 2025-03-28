import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies } from "../../utils/moviesApi";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchMovies(
          "trend",
          "/trending/movie/day?language=en-US"
        );
        setMovies(data);
      } catch (err) {
        setError("Trend filmleri yüklerken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending today</h1>
      {loading && <p>Yükleniyor...</p>}
      {error && <p className={css.err}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default HomePage;
