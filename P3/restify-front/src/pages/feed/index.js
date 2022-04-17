//import React, {useEffect, useState} from 'react';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { get, put_form } from "../../utils";
import Button from "../../components/Common/button";
import LikeButton from "../../components/LikeButton";
import PostBox from "../../components/PostBox";

const Feed = () => {
    const [count, setCount] = useState("");
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [results, setResults] = useState([]);

    const logout = () => {
        window.localStorage.removeItem("access_token");
    }

    useEffect(() => {
        let request = get("http://127.0.0.1:8000/accounts/api/feed/", window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setCount(data.count);
                    setNext(data.next);
                    setPrevious(data.previous);
                    setResults(data.results);
                })
            }
        })


    }, [])

    // const request_posts = async results => {
    //     results.forEach(result => {
    //         let feed_request = get(`http://127.0.0.1:8000/accounts/api/profile/${result.user}/`)
    //         feed_request.then(response => {
    //             if (response.status === 200) {
    //                 response.json().then(data => {
    //                     setPosts([...posts, {
    //                         'id': data.id,
    //                         'username': data.username,
    //                         'avatar': data.avatar,
    //                         'restaurant': data.restaurant,
    //                         'timestamp': result.timestamp,
    //                         'body': result.body
    //                     }])
    //                     console.log(posts);
    //                 })
    //             }

    //         })
    //     })

    // }


    return <>
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-6"></div>
                    <div id="grid">
                        {
                            results.map(result => {
                                return <PostBox key={result.id} userID={result.user} restaurant={result.restaurant} timestamp={result.timestamp} text={result.body} postID={result.id} />
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Feed