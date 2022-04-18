import FollowLikeBox from "../../components/FollowLikeBox";
import { Link } from 'react-router-dom';

const RestaurantCard = ({ id, name, address, postal_code, likes, logo, state, following}) => {

    return <>
    <Link to={"/restaurant/" + id + "/menu/"}>
        <div className="card browse-card p-1">
            <div className="card-image p-5">
                <figure className="image is-4by3">
                    <img src={logo} alt=""/>
                </figure>
            </div>
            <div className="card-header-title restaurant-name">
                {name}
            </div>
            <div className="address">
                {address + " " + postal_code}    
            </div>
        </div>
    </Link>
    </>

}

export default RestaurantCard;