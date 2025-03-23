import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <>
      <ul className={css.linkContainer}>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={location}
                className={css.link}
              >
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default MovieList;
