import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovies } from "../../utils/moviesApi";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    const movieDetailCast = async () => {
      try {
        setLoading(true);
        setError(null);
        setActors([]);
        const data = await fetchMovies(
          "cast",
          `movie/${movieId}/credits?language=en-US`
        );
        setActors(data);
      } catch (err) {
        setError(err.message || "Bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    movieDetailCast();
  }, [movieId]);

  return (
    <>
      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {actors.length > 0 && (
        <ul>
          {actors.map((actor) => {
            return (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.original_name}
                />
                <h3>{actor.original_name}</h3>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
