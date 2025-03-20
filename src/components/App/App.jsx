import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage=lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage=lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast=lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews=lazy(() => import("../MovieReviews/MovieReviews"));
function App() {
  return (
    <>
    <Navigation />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
