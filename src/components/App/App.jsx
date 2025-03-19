import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
function App() {
  return (
    <>
    <Navigation />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
