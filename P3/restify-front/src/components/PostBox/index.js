import LikeButton from "../../components/LikeButton";
import React, { useEffect, useState } from 'react';
import { del, get } from "../../utils";

const PostBox = ({ userID, restaurant, timestamp, text, postID, likes, deleted=false, state=false }) => {

    const [username, setUsername] = useState("");
    const [restaurantname, setRestaurant] = useState("");
    const [avatar, setAvatar] = useState("");
    const [errors, setErrors] = useState([]);

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

    const delete_post = () => {
        let request = del(`http://127.0.0.1:8000/restaurants/api/restaurant/post/` + postID, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 204) {
                state()
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
            <nav className="level is-mobile">
                <div className="level-left">
                    {deleted ? <button class="button is-danger my-1" onClick={delete_post}>
                        <span class="icon">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                        <span>Delete Post</span>
                    </button> : ""}
                </div>
                <div className="level-right">
                    <div className="heart reply">
                        <LikeButton id={postID} post={true} likes={likes}
                        />
                    </div>
                </div>
            </nav>
        </div>
    </>

}

export default PostBox;