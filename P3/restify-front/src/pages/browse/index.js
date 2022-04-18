//import React, {useEffect, useState} from 'react';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { get, put_form } from "../../utils";
import Button from "../../components/Common/button";
import LikeButton from "../../components/LikeButton";
import PostBox from "../../components/PostBox";
import RestaurantCard from "../../components/RestaurantCard";

const Browse = () => {

    const [count, setCount] = useState("");
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [results, setResults] = useState([]);
    const windowUrl = window.location.search;
    const query = new URLSearchParams(windowUrl).get("query");

    useEffect(() => {
        let query_param = query ? `?query=${query}` : ""
        let request = get(`http://127.0.0.1:8000/restaurants/api/restaurant/search/${query_param}`, window.localStorage.getItem("access_token"))
        // let request = get("http://127.0.0.1:8000/accounts/api/browse/", window.localStorage.getItem("access_token"))
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


    }, [query])

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
                                return <RestaurantCard key={result.id} name={result.name} address={result.address} 
                                postal_code={result.postal_code} likes={result.likes} id={result.id} logo={result.logo}/>
                            })
                        }
                        {previous ? <Button styles="" value="Previous" handler={prev_request}></Button> : <></>}
                        {next ? <Button styles="" value="Next" handler={next_request}></Button> : <></>}
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Browse