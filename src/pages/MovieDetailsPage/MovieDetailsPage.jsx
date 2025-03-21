import { useEffect, useState } from "react";
import css from './MovieDetailsPage.module.css'
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovies } from "../../utils/moviesApi";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const movieDetail = async () => {
      try {
        setMovie({});
        setLoading(true);
        const data = await fetchMovies(
          "detail",
          `movie/${movieId}?language=en-US`
        );
        console.log("detail", data);
        setMovie(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    movieDetail();
  }, [movieId]);
  return (
    <>
      <Link to={location.state}>  Go Back</Link>
      <div className={css.container}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
        <div>
          <h2>{movie?.original_title}</h2>
          <p>popularity {movie.popularity}</p>
          <h3>Overview</h3>
          <p>{movie?.overview}</p>
          <h3>Genres</h3>
          {movie?.genres?.length>0 && movie.genres.map((item)=>{
          return <p key={item.id}>{item.name}</p>
          
          })}
        </div>
      </div>
      <NavLink to={"cast"}>Cast</NavLink>
      <NavLink to={"reviews"}>Reviews </NavLink>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
