import LikeButton from "../../components/LikeButton";
import Button from "../../components/Common/button";

const PostBox = ({ username, restaurant, icon, timestamp, text }) => {
    return <>
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-10">
                        <div className="box blog-post">
                            <article className="media">
                                <div className="media-left">
                                    <figure className="image is-64x64">
                                        <img src={icon} alt="Image"></img>
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
                                        <LikeButton
                                        />
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>

}

export default PostBox;