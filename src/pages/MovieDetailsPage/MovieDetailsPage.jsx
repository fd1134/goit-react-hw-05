import { useEffect, useState } from "react";
import css from "./MovieDetailsPage.module.css";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovies } from "../../utils/moviesApi";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  

  useEffect(() => {
    const movieDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovies("detail", `movie/${movieId}?language=en-US`);
        setMovie(data);
      } catch (err) {
        setError(err.message || "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    movieDetail();
  }, [movieId]);

  return (
    <>
      <Link to={location.state} className={css.goBack}>
        ← Go Back
      </Link>

      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {movie && (
        <div className={css.container}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "/placeholder.jpg"}
            alt={movie.original_title || "Movie Poster"}
          />
          <div>
            <h2>{movie.original_title}</h2>
            <p>Popularity: {movie.popularity}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            {movie.genres?.length > 0 ? (
              movie.genres.map((item) => <p key={item.id}>{item.name}</p>)
            ) : (
              <p>Genre information not available.</p>
            )}
          </div>
        </div>
      )}

      <div className={css.additional}>
        <p>Additional information</p>
      <nav className={css.navLinks}>
         <NavLink to="cast" state={location.state}  end>
          Cast
         </NavLink>
         <NavLink to="reviews" state={location.state}  end>
          Reviews
         </NavLink> 
      </nav>
      </div>    
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
