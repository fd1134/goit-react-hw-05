import axios from "axios";
const myApiKey = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDZmZmY5OWU0YmZiOGI2YThhM2YwNjA3YmEzMmJmNyIsIm5iZiI6MTc0MjI0MzczMS42MTIsInN1YiI6IjY3ZDg4NzkzMzE2NzhjYzNmODAxY2MyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vntn90_8pCljg_aPhJkLpmTxffamIktrU-yqvgqCxjM";
axios.defaults.baseURL='https://api.themoviedb.org/3';
axios.defaults.headers.common["Authorization"] = myApiKey;
export const fetchMovies = async (type,url,query) => {
  let response=[];
switch (type) {
  case 'trend':
    response = await axios.get(url);
    break;
  case 'search':
    response = await axios.get(url, {    
      params: {
        query: query
      }
    });
    break;

  default:
    break;
} 
  
 
  return  response.data.results;
};
