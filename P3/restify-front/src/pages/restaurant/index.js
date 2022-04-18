import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet } from "react-router-dom";
import Button from "../../components/Common/button"
import { del } from "../../utils"
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

const Restaurant = () => {
    const user = useOutletContext();

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
    }, [id, likes])

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
                        {does_follow ? <a className="button is-info my-1">
                            <span className="icon">
                                <i className="fas fa-heart"></i>
                            </span>
                            <span>Unfollow</span>
                        </a>
                        : <a className="button is-light my-1">
                            <span className="icon">
                                <i className="fas fa-heart"></i>
                            </span>
                            <span>Follow</span>
                        </a>
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
                <li className="is-active"><Link to="menu">Menu</Link></li>
                <li><Link to="gallery">Photos</Link></li>
                <li><Link to="posts">Posts</Link></li>
                </ul>
            </div>
        </section>

        <Outlet context={ does_own }/>
    </>
}

export default Restaurant
