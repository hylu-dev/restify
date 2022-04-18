import LikeButton from "../../components/LikeButton";
import Button from "../../components/Common/button";
import React, { useEffect, useState } from 'react';
import { put } from "../../utils";


const FollowLikeBox = ({ restaurantID }) => {
	const [followed, setFollowed] = useState(false);

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
			<div className="follow-favourite">
				{ !followed ?
                	<Button styles="" value="Follow" handler={follow_request}></Button> 
            		: <Button styles="" value="Unfollow" handler={unfollow_request}></Button>
            	} 

			    <Button styles="" disabled={false} value="Follow" handler={follow_request}></Button>
			</div>
			<div className="follow-favourite">
				<div className="heart">
					<LikeButton id={restaurantID} post={false}/>
				</div>
			</div>
		</div>
	</>

}

export default FollowLikeBox;