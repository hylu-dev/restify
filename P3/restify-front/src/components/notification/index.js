import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { get } from "../../utils";

const Notification = ({ sourceID, targetID, type, timestamp, body, owner }) => {
    const [name, setName] = useState("")
    const [image, setImage] = useState("");
    const [link, setLink] = useState("/");

    useEffect(() => {
        switch (type) {
            case 'Comment':
                request_user(sourceID);
                setLink(`/restaurant/${owner}/menu/`);
                break;
            case 'Follow':
                request_user(sourceID);
                setLink(`/restaurant/${owner}/menu/`);
                break;
            case 'Like':
                request_user(sourceID);
                setLink(`/restaurant/${owner}/menu/`);
                break;
            case 'Post':
                request_restaurant(sourceID);
                setLink(`/restaurant/${sourceID}/menu/`);
                break;
            case 'Update':
                request_restaurant(sourceID);
                setLink(`/restaurant/${sourceID}/menu/`);
                break;
            default:
        }
    }, [owner, sourceID, type])

    const request_user = async id => {
        let request = get(`http://127.0.0.1:8000/accounts/api/profile/${id}/`)
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setName(data.username);
                    setImage(data.avatar);
                })
            }
        })
    }

    const request_restaurant = async id => {
        let request = get(`http://127.0.0.1:8000/restaurants/api/restaurant/${id}/details/`)
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setName(data.name);
                    setImage(data.logo);
                })
            }
        })
    }

    return <>
        {/* referenced from https://bulma.io/documentation/layout/media-object/ */}
        <Link to={link} className="m-1">
            <div className="notification is-primary is-light">
                <article className="media block">
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img className='preview-image' src={image ? image : ""} alt="" />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                {/* <span className="icon is-small"><i className="fas fa-utensils"></i></span> */}
                                <strong>
                                    <u>{name}</u> {body}
                                </strong> <small>{timestamp}</small>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </Link>
    </>

}

export default Notification;