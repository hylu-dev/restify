import { put } from "../../utils";

const LikeButton = ({ postID }) => {
    const [liked, setLiked] = useState(false);

    const like_request = async e => {
        if (!liked) {
            e.preventDefault();
            let request = put("http://127.0.0.1:8000/restaurants/api/restaurant/post/" + postID + "/like/", {}, window.localStorage.getItem("access_token"))
             request.then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        console.log(data);
                        setLiked(true);
                    });
                }
            })
        }
        
    };

    const unlike_request = async e => {
        if (!liked) {
            e.preventDefault();
            let request = put("http://127.0.0.1:8000/restaurants/api/restaurant/post/" + postID + "/unlike/", {}, window.localStorage.getItem("access_token"))
            request.then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        setLiked(false);
                    });
                }
            })
        }
        
    };


    return <div className="heart reply">
        <i className="fa-regular fa-hover-hidden fa-heart fa-2xl" onClick={like_request}></i>
        <i className="fa-solid fa-hover-show fa-heart fa-2xl" onClick={unlike_request}></i>
    </div>
}

export default LikeButton;