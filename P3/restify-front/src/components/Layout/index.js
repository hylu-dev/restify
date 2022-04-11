import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return <>
        <nav>
            <Link to="/">Feed</Link>
            <Link to="/browse">Browse</Link>
            <Link to="/restaurant/1">Restaurant</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/notifications">Notifications</Link>
        </nav>

        <Outlet />  
    </>
}

export default Layout