//import React, {useEffect, useState} from 'react';
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import Button from "../../components/Common/button"
import { post } from "../../utils"
import { useNavigate } from "react-router-dom";

const Restaurant = () => {
    return <>
        <section className="section" style={{padding: "0px"}}>
            <section className="hero is-primary is-halfheight">
                <div className="hero-body">
                    <div className="columns my-6">
                        <div className="column is-full">
                            <figure className="image is-square is-128x128" style={{border: "2px dashed white", borderRadius: "90px"}}>
                                <img className="is-rounded" src="https://th.bing.com/th/id/R.23bce0ee3759a2d1f406aaeb0592ffea?rik=Huo25KyrLKlNGw&riu=http%3a%2f%2fcdn.abclocal.go.com%2fcontent%2fwpvi%2fimages%2fcms%2f306462_1280x720.jpg&ehk=usR8dR5UJvUM7sIxlatLasT0uW%2bsz41KQkRFgP8VwWc%3d&risl=&pid=ImgRaw&r=0" alt="Olive Garden"></img>
                            </figure>
                        </div>
                    </div>

                    <div className="column is-four-fifths" style={{marginLeft: "80px"}}>
                        <p className="title ml-6">
                            Olive Garden
                        </p>
                        <hr className="navbar-divider" style={{width: "300px"}}></hr>

                        <p className="subtitle mt-5 ml-6">
                            fillerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                        </p>
                    </div>
                </div>
            </section>

            <nav className="navbar is-primary is-transparent" style={{backgroundColor: "#02b196", height: "10px", zIndex: "0"}}>  
                <div className="navbar-menu">
                    <div className="navbar-item pl-6 ml-3">
                        <a className="button is-light my-1">
                            <span className="icon">
                                <i className="fas fa-heart"></i>
                            </span>
                            <span>Follow</span>
                        </a>
                    </div>

                    <a className="navbar-item has-text-light ml-6">
                        <span className="icon is-large">
                            <i className="fas fa-thumbs-up"></i>
                        </span>
                        <span>500</span>
                    </a>
                    
                    <a className="navbar-item has-text-light is-expanded ml-6">
                        <span className="icon is-large">
                            <i className="fas fa-share"></i>
                        </span>
                        <span>Share</span>
                    </a>

                    <div className="navbar-item pr-4">
                        <label className="button is-light my-1">
                            <span className="icon">
                                <i className="fas fa-edit"></i>
                            </span>
                            <span>Edit</span>
                        </label>
                    </div>

                    <div className="navbar-item pr-6 mr-3">
                        <a className="button is-danger my-1">
                            <span className="icon">
                                <i className="fas fa-trash-alt"></i>
                            </span>
                            <span>Delete Restaurant</span>
                        </a>
                    </div>
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

        <Outlet />
    </>
}

export default Restaurant
