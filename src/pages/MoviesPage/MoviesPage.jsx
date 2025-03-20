import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css"
import MovieList from "../../components/MovieList/MovieList";
import {fetchMovies} from '../../utils/moviesApi';
const MoviesPage = () => {
    const [movies, setMovies] = useState([])
    const [error,setError]=useState(false);
    const [loading, setLoading]=useState(false);
    const [query, setQuery] = useState('');
    const movieSearch = async () => {
      try {
        setMovies([]);
        setLoading(true);        
        const data = await fetchMovies('search','search/movie?include_adult=false&language=en-US&page=1',query);
        console.log("bak",data);
        setMovies(data);
      } catch (err) {
        setError(true);
       
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      if (query) {
        movieSearch();
      }
    }, [query]);

    const handleOnSubmit=async (evnt)=>{
        evnt.preventDefault();
        const frm=evnt.target;
        const inpt=frm.elements.search;
        setQuery(inpt.value.trim()); 
        frm.reset();

    }

  return (
    <>
   
      <form className={css.frm} onSubmit={handleOnSubmit}>
        <input type="text" name="search" className={css.inpt} />
        <button type="submit" className={css.btn}>Search</button>
      </form>
      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movies.length>0 && <MovieList  movies={movies}/>}
    </>
  );
};

export default MoviesPage;
