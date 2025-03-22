import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovies } from "../../utils/moviesApi";
const MovieReviews=()=>{
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { movieId } = useParams();
      useEffect(() => {
        const movieDetailReviews = async () => {
          try {
            setLoading(true);
            setError(null);
            setAuthors([]);
            const data = await fetchMovies("reviews", `movie/${movieId}/reviews?language=en-US`);
            setAuthors(data);
          } catch (err) {
            setError(err.message || "Bir hata oluştu.");
          } finally {
            setLoading(false);
          }
        };
        movieDetailReviews();
      }, [movieId]);
  
    return <>
     {loading && <p>Yükleniyor...</p>}
     {error && <p style={{ color: "red" }}>{error}</p>}
    {authors.length > 0 ? (
    <ul>
        {
              authors.map((author)=>{
                return <li key={author.id}>
                
                    <p>Author:{author.author}</p>
                    <p>{author.content}</p>
                </li>
            })
        }
  
           
    </ul>) : ("We don't have any reviews for this movie. ")
    }
    </>
}

export default MovieReviews;