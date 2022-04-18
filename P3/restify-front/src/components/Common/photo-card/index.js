import React, { useState } from "react";
import { del } from "../../../utils";

const PhotoCard = ({ id, name, photo, edit, state }) => {
    const [errors, setErrors] = useState([]);

    const delete_photo = () => {
        let request = del(`http://127.0.0.1:8000/restaurants/api/restaurant/photo/` + id + `/delete/`, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 204) {
                state(true);
            } else if (response.status === 401) {
                response.json().then(data => {
                    setErrors([data.detail])
                });
            } else if (response.status === 400) {
                response.json().then(data => {
                    let err = []
                    for (const [key, value] of Object.entries(data)) {
                        err.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
                    }
                    setErrors(err)
                });
            }
        }).catch(err => {
            setErrors([err.toString()])
        });
    };

    return <div class="card" width="100%" height="100%">
        <div class="card-image">
        <figure class="image is-3by2">
            <img src={ photo } alt="" width="200" height="200"></img>
        </figure>
        </div>

        <div class="card-content" style={{padding: "10px"}}>
            <div class="media">
                <ul className="has-text-danger">
                    {errors.map(item => <li className="tag tag__custom is-danger mb-1" key={item}>{item}</li>)}
                </ul>
                <section class="container has-text-centered">
                    <p class="title is-3 my-1">{ name }</p>
                </section>
            </div>
        </div>

        {edit ? <footer class="card-footer">
            <a class="card-footer-item" href="/" onClick={ delete_photo }>
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-trash-alt"></i>
                    </span>
                    <span>Delete</span>
                </span>
            </a>
        </footer> : ""}
    </div>
}

export default PhotoCard;