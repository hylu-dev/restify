import LikeButton from "../../components/LikeButton";
import Button from "../../components/Common/button";
import React, { useState } from 'react';
import { put } from "../../utils";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

const FollowLikeBox = ({ restaurantID, likes, state, following }) => {
	const user = useOutletContext();
	const [followed, setFollowed] = useState(following);
	const follow_request = async e => {
        e.preventDefault();
        let request = put("http://127.0.0.1:8000/accounts/api/restaurant/" + restaurantID + "/follow/", {}, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setFollowed(true);
                });
            }
        })

    };

    const unfollow_request = async e => {
        e.preventDefault();
        let request = put("http://127.0.0.1:8000/accounts/api/restaurant/" + restaurantID + "/unfollow/", {}, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setFollowed(false);
                });
            }
        })

    };


	return <>
		<div id="follow-favourite-container">
			<div className="follow-favourite navigation">
				{ restaurantID !== user.restaurant ?
					!followed ?
                		<Button styles="" value="Follow" handler={follow_request}></Button> 
            			: <Button styles="" value="Unfollow" handler={unfollow_request}></Button> 
            		: <></>
            	} 
				<LikeButton id={restaurantID} post={false} likes={likes} state={state} original={restaurantID}/>
			</div>
		</div>
	</>

}

export default FollowLikeBox;