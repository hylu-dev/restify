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
        console.log("hi")
        let request = get("http://127.0.0.1:8000/accounts/api/feed/", window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data);
                    setCount(data.count);
                    setNext(data.next);
                    setPrevious(data.previous);
                    setResults(data.results);
                })
            }
        })
    }, [])


    return <>
        <section class="section">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-6"></div>
                    <div id="grid">

                        {results.map(result => (
                            <PostBox key={0} username={result.user} restaurant={result.restaurant} icon={null}
                                timestamp={result.timestamp} text={result.body} />
                        ))}


                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Feed