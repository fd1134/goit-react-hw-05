import { NavLink, Outlet } from "react-router-dom";

const MovieDetailsPage=()=>{
    return<>
    <NavLink to={"cast"} >Cast</NavLink>
    <NavLink to={"reviews"}>Reviews </NavLink>
    <Outlet />
    </>
}

export default MovieDetailsPage;