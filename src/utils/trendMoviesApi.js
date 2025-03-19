import axios from "axios";
axios.defaults.baseURL='https://api.themoviedb.org/3/trending/movie/day?language=en-US'
export const fetchTrendMovies = async () => {
  
  const response = await axios.get('', {   
   
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDZmZmY5OWU0YmZiOGI2YThhM2YwNjA3YmEzMmJmNyIsIm5iZiI6MTc0MjI0MzczMS42MTIsInN1YiI6IjY3ZDg4NzkzMzE2NzhjYzNmODAxY2MyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vntn90_8pCljg_aPhJkLpmTxffamIktrU-yqvgqCxjM",
    },
  });
 
  return  response.data.results;
};
