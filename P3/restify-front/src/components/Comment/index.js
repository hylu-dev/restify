import LikeButton from "../../components/LikeButton";
import React, { useEffect, useState } from 'react';
import { del, get } from "../../utils";

const Comment = ({ userID, restaurant, timestamp, text, postID, likes, deleted=false, state=false }) => {
    const [username, setUsername] = useState("");
    const [restaurantname, setRestaurant] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        let request = get(`http://127.0.0.1:8000/accounts/api/profile/${userID}/`)
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setUsername(data.username);
                    setAvatar(data.avatar);
                })
            }
        })
        request = get(`http://127.0.0.1:8000/restaurants/api/restaurant/${restaurant}/details/`)
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setRestaurant(data.name)
                })
            }
        })
    }, [restaurant, userID])

    return <>
        <div className="box blog-post">
            <article className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={avatar} alt=""></img>
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{username}</strong> <a href="/"><small>{restaurantname}</small></a> <small>{timestamp}</small>
                            <br></br>
                            {text}
                        </p>
                    </div>
                </div>
            </article>
        </div>
    </>

}

export default Comment;