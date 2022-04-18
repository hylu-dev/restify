import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import Button from "../../../components/Common/button";
import { get, post } from "../../../utils";
import PostBox from "../../../components/PostBox";
import Comment from "../../../components/Comment";

const Posts = () => {
    const does_own = useOutletContext().does_own;
    const user = useOutletContext().user;
    const restaurant_name = useOutletContext().name;
    const logo = useOutletContext().logo;

    const { id } = useParams();

    const [posts, setPosts] = useState([]);
    const [query1, setQuery1] = useState({ search: '', page: 1 });
    const [totalPages1, setTotalPages1] = useState(1);

    const [comments, setComments] = useState([]);
    const [query2, setQuery2] = useState({ search: '', page: 1 });
    const [totalPages2, setTotalPages2] = useState(1);

    const [isDeleted, setIsDeleted] = useState(false);

    const [postBody, setPostBody] = useState("");
    const [commentBody, setCommentBody] = useState("");

    console.log(comments);


    useEffect(() => {
        let request = get(`http://127.0.0.1:8000/restaurants/api/restaurant/` + id + `/posts/?search=${query1.search}&page=${query1.page}`, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setPosts(data.results);
                    setTotalPages1(Math.ceil(data.count / 8));
                })
            }
        })

        let request2 = get(`http://127.0.0.1:8000/restaurants/api/restaurant/` + id + `/comments/?search=${query2.search}&page=${query2.page}`, window.localStorage.getItem("access_token"))
        request2.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setComments(data.results);
                    setTotalPages2(Math.ceil(data.count / 8));
                })
            }
        })
        setIsDeleted(false);
    }, [id, query1, query2, isDeleted])

    const create_post = async e => {
        e.preventDefault();
        let request = post(`http://127.0.0.1:8000/restaurants/api/restaurant/post/`, { body: postBody }, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 201) {
                response.json().then(data => {
                    setIsDeleted(!isDeleted);
                })
            }
        })
    }

    const create_comment = async e => {
        e.preventDefault();
        let request = post(`http://127.0.0.1:8000/restaurants/api/restaurant/comment/${id}/post/`, { body: commentBody }, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 201) {
                response.json().then(data => {
                    setIsDeleted(!isDeleted);
                })
            }
        })
    }

    return <>
        <div id="Posts-list" style={{ backgroundColor: "white" }}>
            <div className="container">
                <div className="pt-6">
                    <section>
                        <div className="columns is-centered" style={{ marginLeft: "5%", marginRight: "5%" }}>
                            <div className="column is-centered">
                                <h1 className="title is-1">Posts</h1>
                            </div>
                        </div>
                        <hr className="navbar-divider" style={{ width: "300px" }}></hr>
                    </section>
                    <div className="columns is-centered" style={{ marginLeft: "5%", marginRight: "5%" }}>
                        <div className="column is-centered">
                            {totalPages1 == 0 ? "" : <h1 className="title is-4">Page {query1.page} of {totalPages1}</h1>}
                        </div>
                    </div>
                    {does_own ? <div className="box blog-post">
                        <article className="media">
                            <div className="media-left">
                                <figure className="image is-square is-96x96" style={{ border: "2px dotted black", borderRadius: "55px" }}>
                                    <img className="is-rounded" src={logo} alt=""></img>
                                </figure>
                            </div>
                            <div className="media-content">
                                <div className="content my-5">
                                    <div className="media-content">
                                        <p className="title is-4">{restaurant_name}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <nav className="level is-mobile">
                            <div className="level-left"></div>
                            <div className="level-right"></div>
                        </nav>
                        <form method="POST">
                            <div className="comment-box">
                                <textarea className="textarea has-fixed-size" placeholder="What's on your mind?" rows="4" onChange={e => setPostBody(e.target.value)}></textarea>
                            </div>
                            <nav className="level is-mobile">
                                <div className="level-left"></div>
                                <div className="level-right pt-3">
                                    <Button handler={create_post} value="Create Post"></Button>
                                </div>
                            </nav>
                        </form>
                    </div> : ""}
                </div>

                <br />

                <div id="Sub-posts" className="mx-6 pb-6">
                    <div>
                        {posts.map(post => {
                            return <PostBox key={post.id} userID={post.user} restaurant={post.restaurant} timestamp={post.timestamp} text={post.body} postID={post.id} likes={post.likes} deleted={does_own} state={setIsDeleted} />
                        })}
                    </div>
                </div>
            </div>

            <div className="columns mt-4" style={{ marginLeft: "10%", marginRight: "5%" }}>
                <section className="container has-text-centered">
                    <div className="column is-narrow">
                        {query1.page > 1 ? <Button styles="" value="Previous" handler={() => setQuery1({ ...query1, page: query1.page - 1 })} /> : <></>}
                    </div>
                    <div className="column is-narrow">
                        {query1.page < totalPages1 ? <Button styles="" value="Next" handler={() => setQuery1({ ...query1, page: query1.page + 1 })} /> : <></>}
                    </div>
                </section>
            </div>
        </div>

        <div id="Comments-list" style={{ backgroundColor: "white" }}>
            <div className="container">
                <div className="pt-6">
                    <section>
                        <div className="columns is-centered" style={{ marginLeft: "5%", marginRight: "5%" }}>
                            <div className="column is-centered">
                                <h1 className="title is-1">Comments</h1>
                            </div>
                        </div>
                        <hr className="navbar-divider" style={{ width: "300px" }}></hr>
                    </section>
                    <div className="columns is-centered" style={{ marginLeft: "5%", marginRight: "5%" }}>
                        <div className="column is-centered">
                            {totalPages2 == 0 ? "" : <h1 className="title is-4">Page {query2.page} of {totalPages2}</h1>}
                        </div>
                    </div>
                    {does_own ? "" : <div className="box blog-post">
                        <article className="media">
                            <div className="media-left">
                                <figure className="image is-square is-96x96" style={{ border: "2px dotted black", borderRadius: "55px" }}>
                                    <img className="is-rounded" src={user.avatar} alt=""></img>
                                </figure>
                            </div>
                            <div className="media-content">
                                <div className="content my-5">
                                    <div className="media-content">
                                        <p className="title is-4">{user.username}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <nav className="level is-mobile">
                            <div className="level-left"></div>
                            <div className="level-right"></div>
                        </nav>
                        <form method="POST">
                            <div className="comment-box">
                                <textarea className="textarea has-fixed-size" placeholder="What's on your mind?" rows="4" onChange={e => setCommentBody(e.target.value)}></textarea>
                            </div>
                            <nav className="level is-mobile">
                                <div className="level-left"></div>
                                <div className="level-right pt-3">
                                    <Button handler={create_comment} value="Post Comment"></Button>
                                </div>
                            </nav>
                        </form>
                    </div>}
                </div>

                <br />

                <div id="Sub-comments" className="mx-6 pb-6">
                    <div>
                        {comments.map(post => {
                            return <Comment key={post.id} postID={post.id} userID={post.user} restaurant={post.restaurant} timestamp={post.timestamp} text={post.body} likes={post.likes} deleted="false" state={setIsDeleted} />
                        })}
                    </div>
                </div>
            </div>

            <div className="columns mt-4" style={{ marginLeft: "10%", marginRight: "5%" }}>
                <section className="container has-text-centered">
                    <div className="column is-narrow">
                        {query2.page > 1 ? <Button styles="" value="Previous" handler={() => setQuery2({ ...query2, page: query2.page - 1 })} /> : <></>}
                    </div>
                    <div className="column is-narrow">
                        {query2.page < totalPages2 ? <Button styles="" value="Next" handler={() => setQuery2({ ...query2, page: query2.page + 1 })} /> : <></>}
                    </div>
                </section>
            </div>
        </div>
    </>
}

export default Posts