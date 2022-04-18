//import React, {useEffect, useState} from 'react';
import React, { useEffect, useState } from 'react';
import { get } from "../../utils";
import Button from "../../components/Common/button";
import PostBox from "../../components/PostBox";
import { useOutletContext } from "react-router-dom";

const Feed = () => {
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [results, setResults] = useState([]);
    const user = useOutletContext();

    useEffect(() => {
        let request = get("http://127.0.0.1:8000/accounts/api/feed/", window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    console.log(data.results);
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
                                var state = result.userlikers.includes(user.id) ? state = true : state = false;
                                return <PostBox key={result.id} userID={result.user} restaurant={result.restaurant} timestamp={result.timestamp} text={result.body} postID={result.id} likes={result.likes} state={state} />
                            })
                        }
                        <div className="pagination">
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