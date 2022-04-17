import LikeButton from "../../components/LikeButton";
import Button from "../../components/Common/button";
import React, { useEffect, useState } from 'react';
import { get, put_form } from "../../utils";

const PostBox = ({ userID, restaurant, timestamp, text, postID }) => {

    const [username, setUsername] = useState("");
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
    }, [])

    return <>
        <div className="box blog-post">
            <article className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={avatar} alt="Image"></img>
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{username}</strong> <a href="#"><small>{restaurant}</small></a> <small>{timestamp}</small>
                            <br></br>
                            {text}
                        </p>
                    </div>
                </div>
            </article>
            <nav className="level is-mobile">
                <div className="level-left"></div>
                <div className="level-right">
                    <div className="heart reply">
                        <LikeButton postID={postID}
                        />
                    </div>
                </div>
            </nav>
        </div>
    </>

}

export default PostBox;