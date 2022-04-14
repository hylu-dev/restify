import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../Layout";
import Browse from "../../pages/browse";
import Feed from "../../pages/feed";
import Restaurant from "../../pages/restaurant";
import Profile from "../../pages/profile";
import Notifications from "../../pages/notifications";
import Login from "../../pages/login"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Feed />} />
                    <Route path="browse" element={<Browse />} />
                    <Route path="restaurant/:id" element={<Restaurant />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="login" element={<Login/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router