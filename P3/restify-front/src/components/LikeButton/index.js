import { put } from "../../utils";
import React, { useEffect, useState } from 'react';
import Button from "../../components/Common/button";


const LikeButton = ({ id, post }) => {
    const [liked, setLiked] = useState(false);

    const like_restaurant_request = async e => {
        e.preventDefault();
        let request = put("http://127.0.0.1:8000/restaurants/api/restaurant/" + id + "/like/", {}, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setLiked(true);
                });
            }
        })

    };

    const unlike_restaurant_request = async e => {
        e.preventDefault();
        let request = put("http://127.0.0.1:8000/restaurants/api/restaurant/" + id + "/unlike/", {}, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setLiked(true);
                });
            }
        })

    };

    const like_post_request = async e => {
        e.preventDefault();
        let request = put("http://127.0.0.1:8000/restaurants/api/restaurant/post/" + id + "/like/", {}, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data);
                    setLiked(true);
                });
            }
        })

    };

    const unlike_post_request = async e => {
        e.preventDefault();
        let request = put("http://127.0.0.1:8000/restaurants/api/restaurant/post/" + id + "/unlike/", {}, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data);
                    setLiked(false);
                });
            }
        })

    };


    return <div className="heart reply">

        {{post} ? 
            !liked ?
                <Button styles="" value="Like" handler={like_post_request}></Button> 
            : <Button styles="" value="Unike" handler={unlike_post_request}></Button> 
        : !liked ?
                <Button styles="" value="Like" handler={like_restaurant_request}></Button> 
            : <Button styles="" value="Unike" handler={unlike_restaurant_request}></Button> 



        }

    </div>
}

export default LikeButton;