import LikeButton from "../../components/LikeButton";
import FollowLikeBox from "../../components/FollowLikeBox";
import Button from "../../components/Common/button";
import React, { useEffect, useState } from 'react';
import { get, put_form } from "../../utils";
import { Link } from 'react-router-dom';

const RestaurantCard = ({ id, name, address, postal_code, likes, logo }) => {

    return <>
    <Link to={"/restaurants/" + id + "/"}>
        <div className="card browse-card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={logo} alt="Logo image"/>
                </figure>
            </div>
            <div className="card-header-title restaurant-name">
                {name}
            </div>
            <div className="address">
                {address + postal_code}    
            </div>

            <FollowLikeBox restaurantID={id}/>
        </div>
    </Link>
    </>

}

export default RestaurantCard;