import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../Layout";
import Browse from "../../pages/browse";
import Feed from "../../pages/feed";
import Restaurant from "../../pages/restaurant";
import Menu from "../../pages/restaurant/menu";
import EditMenu from "../../pages/restaurant/edit-menu";
import Gallery from "../../pages/restaurant/photos";
import Posts from "../../pages/restaurant/posts";
import Profile from "../../pages/profile";
import Notifications from "../../pages/notifications";
import Login from "../../pages/login"
import Register from "../../pages/register"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login/>}></Route>
                <Route path="register" element={<Register/>}></Route>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Feed />} />
                    <Route path="browse" element={<Browse />} />
                    <Route path="restaurant/:id/" element={<Restaurant />}>
                        <Route path="menu" element={<Menu />}/>
                        <Route path="edit-menu" element={<EditMenu />}/>
                        <Route path="gallery" element={<Gallery />}/>
                        <Route path="posts" element={<Posts />}/>
                    </Route>
                    <Route path="profile" element={<Profile />} />
                    <Route path="notifications" element={<Notifications />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router