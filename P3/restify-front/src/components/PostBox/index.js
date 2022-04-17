import LikeButton from "../../components/LikeButton";
import Button from "../../components/Common/button";

const PostBox = ({ username, restaurant, icon, timestamp, text }) => {
    return <> 
    <section class="section">
    <div class="container">
    <div class="columns is-centered">
        <div class="column is-10">
        <div class="box blog-post">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-64x64">
                                <img src={ icon } alt="Image"></img>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>{ username }</strong> <a href="#"><small>{ restaurant }</small></a> <small>{ timestamp }</small>
                                    <br></br>
                                    { text }
                                </p>
                            </div>
                        </div>
                    </article>
                    <nav class="level is-mobile">
                        <div class="level-left"></div>
                        <div class="level-right">
                            <div class="heart reply">
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