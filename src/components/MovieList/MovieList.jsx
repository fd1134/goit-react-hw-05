const MovieList=({movies})=>{
    console.log("movilist",movies);
    return <>
    <ul>
        {movies.map((movie)=>{
         return   <li key={movie.id}>{movie.title}aaaaa</li>
        })}
    </ul>
    </>
}
export default MovieList;