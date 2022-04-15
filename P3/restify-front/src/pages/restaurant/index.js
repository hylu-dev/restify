//import React, {useEffect, useState} from 'react';

const Restaurant = () => {
    return <>
        <section class="section" style={{padding: "0px"}}>
            <section class="hero is-primary is-halfheight">
                <div class="hero-body">
                    <div class="columns my-6">
                        <div class="column is-full">
                            <figure class="image is-square is-128x128" style={{border: "2px dashed white", borderRadius: "90px"}}>
                                <img class="is-rounded" src="https://th.bing.com/th/id/R.23bce0ee3759a2d1f406aaeb0592ffea?rik=Huo25KyrLKlNGw&riu=http%3a%2f%2fcdn.abclocal.go.com%2fcontent%2fwpvi%2fimages%2fcms%2f306462_1280x720.jpg&ehk=usR8dR5UJvUM7sIxlatLasT0uW%2bsz41KQkRFgP8VwWc%3d&risl=&pid=ImgRaw&r=0" alt="Olive Garden"></img>
                            </figure>
                        </div>
                    </div>

                    <div class="column is-four-fifths" style={{marginLeft: "80px"}}>
                        <p class="title ml-6">
                            Olive Garden
                        </p>
                        <hr class="navbar-divider" style={{width: "300px"}}></hr>

                        <p class="subtitle mt-5 ml-6">
                            fillerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                        </p>
                    </div>
                </div>
            </section>

            <nav class="navbar is-primary is-transparent" style={{backgroundColor: "#02b196", height: "10px"}}>  
                <div class="navbar-menu">
                    <div class="navbar-item pl-6 ml-3">
                        <a class="button is-light my-1">
                            <span class="icon">
                                <i class="fas fa-heart"></i>
                            </span>
                            <span>Follow</span>
                        </a>
                    </div>

                    <a class="navbar-item has-text-light ml-6">
                        <span class="icon is-large">
                            <i class="fas fa-thumbs-up"></i>
                        </span>
                        <span>500</span>
                    </a>
                    
                    <a class="navbar-item has-text-light is-expanded ml-6">
                        <span class="icon is-large">
                            <i class="fas fa-share"></i>
                        </span>
                        <span>Share</span>
                    </a>

                    <div class="navbar-item pr-4">
                        <label class="button is-light my-1">
                            <span class="icon">
                                <i class="fas fa-edit"></i>
                            </span>
                            <span>Edit</span>
                        </label>
                    </div>

                    <div class="navbar-item pr-6 mr-3">
                        <a class="button is-danger my-1">
                            <span class="icon">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                            <span>Delete Restaurant</span>
                        </a>
                    </div>
                </div>
            </nav>

            <br></br>
            <br></br>
            <br></br>

            <div class="tabs is-boxed is-fullwidth m-0 mx-6">
                <ul>
                <li class="is-active"><a href="restaurant-profile-menu.html">Menu</a></li>
                <li><a href="restaurant-profile-photos.html">Photos</a></li>
                <li><a href="restaurant-profile-posts.html">Posts</a></li>
                </ul>
            </div>

        </section>
    </>
}

export default Restaurant
