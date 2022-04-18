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
                    console.log(data);
                    setCount(data.count);
                    setNext(data.next);
                    setPrevious(data.previous);
                    setResults(data.results);
                })
            }
        })


    }, [])

    const next_request = async e => {
        e.preventDefault();
        let request = get(next, window.localStorage.getItem("access_token"))
         request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setCount(data.count);
                    setNext(data.next);
                    setPrevious(data.previous);
                    setResults(data.results)
                });
            }
        })
        
    };

    const prev_request = async e => {
        e.preventDefault();
        let request = get(previous, window.localStorage.getItem("access_token"))
         request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setCount(data.count);
                    setNext(data.next);
                    setPrevious(data.previous);
                    setResults(data.results)

                });
            }
        })
        
    };


    return <>
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div id="grid column is-8">
                        {
                            results.map(result => {
                                return <PostBox key={result.id} userID={result.user} restaurant={result.restaurant} timestamp={result.timestamp} text={result.body} postID={result.id} likes={result.likes} />
                            })
                        }
                        <div className="navigation">
                            {previous ? <Button styles="" value="Previous" handler={prev_request}></Button> : <></>}
                            {next ? <Button styles="" value="Next" handler={next_request}></Button> : <></>}
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </>
}

export default Feed