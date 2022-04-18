import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import Button from "../../components/Common/button"
import { put } from "../../utils"
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

const Restaurant = () => {
    const user = useOutletContext();

    const [followed, setFollowed] = useState(false);
    const [tab, setTab] = useState(0);
    const [name, setName] = useState("");
    const [logo, setLogo] = useState(null);
    const [address, setAddress] = useState("");
    const [postal, setPostal] = useState("");
    const [phone, setPhone] = useState("");
    const [followers, setFollowers] = useState([]);
    const [likes, setLikes] = useState(1);
    const { id } = useParams();

    let does_own = (user.restaurant == id);
    let does_follow = (followers.includes(user.id));

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/restaurants/api/restaurant/` + id + `/details/`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setName(data.name)
                setLogo(data.logo)
                setAddress(data.address)
                setPostal(data.postal_code)
                setPhone(data.phone_number)
                setFollowers(data.followers)
                setLikes(data.likes)
            })
    }, [id, likes, followed, tab])

    const follow_request = async e => {
        e.preventDefault();
        let request = put("http://127.0.0.1:8000/accounts/api/restaurant/" + id + "/follow/", {}, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setFollowed(true);
                });
                does_follow = true;
            }
        })

    };

    const unfollow_request = async e => {
        e.preventDefault();
        let request = put("http://127.0.0.1:8000/accounts/api/restaurant/" + id + "/unfollow/", {}, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setFollowed(false);
                });
                does_follow = false;
            }
        })

    };

    const set_tab1 = () => {
        setTab(0);
    }

    const set_tab2 = () => {
        setTab(1);
    }

    const set_tab3 = () => {
        setTab(2);
    }

    return <>
        <section className="section" style={{padding: "0px"}}>
            <section className="hero is-primary is-halfheight">
                <div className="hero-body">
                    <div className="columns my-6">
                        <div className="column is-full">
                            <figure className="image is-square is-128x128" style={{border: "2px dashed white", borderRadius: "90px"}}>
                                <img className="is-rounded" src={ logo } alt=""></img>
                            </figure>
                        </div>
                    </div>

                    <div className="column is-four-fifths" style={{marginLeft: "80px"}}>
                        <p className="title ml-6">{ name }</p>
                        <hr className="navbar-divider" style={{width: "300px"}}></hr>

                        <p className="subtitle mt-5 ml-6">
                            { address } { postal }
                        </p>
                        <p className="subtitle mt-5 ml-6">
                            { phone }
                        </p>
                    </div>
                </div>
            </section>

            <nav className="navbar is-primary is-transparent" style={{backgroundColor: "#02b196", height: "10px", zIndex: "0"}}>  
                <div className="navbar-menu">
                    {does_own ? "" : <div className="navbar-item pl-6 ml-3">
                        {does_follow ? <button className="button is-info my-1" onClick={ unfollow_request }>
                            <span className="icon">
                                <i className="fas fa-heart"></i>
                            </span>
                            <span>Unfollow</span>
                        </button>
                        : <button className="button is-light my-1" onClick={ follow_request }>
                            <span className="icon">
                                <i className="fas fa-heart"></i>
                            </span>
                            <span>Follow</span>
                        </button>
                    }
                    </div>}

                    <a className="navbar-item has-text-light ml-6">
                        <span className="icon is-large">
                            <i className="fas fa-thumbs-up"></i>
                        </span>
                        <span>{ likes }</span>
                    </a>

                    {does_own ? <div className="navbar-item pr-4">
                        <Link to="/restaurant/create" className="navbar-item">
                            <label className="button is-light my-1">
                                <span className="icon">
                                    <i className="fas fa-edit"></i>
                                </span>
                                <span>Edit</span>
                            </label>
                        </Link>
                    </div> : ""}
                </div>
            </nav>

            <br></br>
            <br></br>
            <br></br>

            <div className="tabs is-boxed is-fullwidth m-0 mx-6">
                <ul>
                <li className={tab === 0 ? "is-active" : ""} onClick={ set_tab1 }><Link to="menu">Menu</Link></li>
                <li className={tab === 1 ? "is-active" : ""} onClick={ set_tab2 }><Link to="gallery">Photos</Link></li>
                <li className={tab === 2 ? "is-active" : ""} onClick={ set_tab3 }><Link to="posts">Posts</Link></li>
                </ul>
            </div>
        </section>

        <Outlet context={ does_own }/>
    </>
}

export default Restaurant
