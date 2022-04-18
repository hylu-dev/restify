import {Link, Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { get } from "../../utils";
import Search from "../search";

const Layout = () => {
    const [id, setId] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let request = get("http://127.0.0.1:8000/accounts/api/user/auth/", window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setId(data.id);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setUsername(data.username);
                    setAvatar(data.avatar);
                    setRestaurant(data.owner);
                })
            } else {
                logout();
                navigate("/login");
            }
        })
    }, [navigate])

    const logout = () => {
        window.localStorage.removeItem("access_token");
    }

    return <>
        <nav className="navbar has-shadow is-primary is-fixed-top">
            <div className="navbar-brand pl-2">
                <Link to="/" className="navbar-item">
                    <span className="icon is-large has-text-primary-dark">
                        <i className="fas fa-store fa-2x"></i>
                    </span>
                    <div className="navbar-burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </Link>
            </div> 
            
            <div className="navbar-menu">
                <div className="navbar-item">
                    <Search></Search>
                </div>
                <div className="navbar-end pr-2">
                    <Link to="/" className="navbar-item">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-home"></i>
                            </span>
                            <span>Home</span>
                        </span>
                    </Link>
                    <Link to="/browse" className="navbar-item">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-utensils"></i>
                            </span>
                            <span>Browse</span>
                        </span>
                    </Link>
                    <Link to={`/restaurant/${restaurant}/menu`} className="navbar-item">
                        <span className="icon-text">
                            <span className="icon">
                                <i className="fas fa-store"></i>
                            </span>
                            <span>My Restaurant</span>
                        </span>
                    </Link>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <Link to="/profile" className="navbar-link">
                            <span className="icon-text">
                                <span className="icon">
                                    <i className="fas fa-user"></i>
                                </span>
                                <span>Profile</span>
                            </span>
                        </Link>
        
                        <div className="navbar-dropdown is-right" style={{width: '380px'}}>
                            <article className="media">
                                <div className="media-left pt-5 pl-5">
                                    <img className="is-64x64 is-rounded" src={avatar} alt="Person"/>
                                </div>
                                <div className="media-content py-2">
                                    <div className="content mt-1">
                                    <div className="media-content">
                                        <p className="title is-4">{`${firstName} ${lastName}`}</p>
                                        <p className="subtitle is-6">{`@${username}`}</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="media-right pr-5 pt-4">
                                    <div className="box has-background-info-light has-text-centered p-2" style={{width: '80px'}}>
                                        {
                                            restaurant ? "Owner" : "User"
                                        }
                                    </div>
                                </div>
                            </article>
        
                            <hr className="navbar-divider"/>
        
                            <Link to="/profile" className="navbar-item">
                                <span className="icon is-large">
                                    <i className="fas fa-edit"></i>
                                </span>
                                <span>Edit Profile</span>
                            </Link>
        
                            <Link to="/login" className="navbar-item" onClick={logout}>
                                <span className="icon is-large">
                                    <i className="fas fa-door-open"></i>
                                </span>
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>

                    <Link to="/notifications" className="navbar-item">
                        <span className="icon-text px-5">
                            <span className="icon">
                                <i className="fas fa-bell fa-2x"></i>
                            </span>
                        </span>
                    </Link>

                    {/* <div className="dropdown is-right is-hoverable">
                        <div className="dropdown-trigger">
                            <Link to="/notifications" className="navbar-item">
                                <span className="icon is-large has-text-light">
                                    <i className="fas fa-bell fa-2x"></i>
                                </span>
                            </Link>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                            <div className="dropdown-content">
                                <div className="dropdown-item">Placeholder</div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </nav>

        <Outlet context={{id, username, avatar, restaurant}} />
    </>
}

export default Layout