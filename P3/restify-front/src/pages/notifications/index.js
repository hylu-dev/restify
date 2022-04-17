import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from "../../components/Common/button";
import { get, post } from "../../utils";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification"

const Notifications = () => {
    const [results, setResults] = useState([]);
    const [next, setNext] = useState("");
    const [owner, setOwner] = useState("");

    useEffect(() => {
        let request = get("http://127.0.0.1:8000/accounts/api/notifications/", window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setNext(data.next)
                    setResults(data.results);
                })
            }
        })
        request = get("http://127.0.0.1:8000/accounts/api/user/auth/", window.localStorage.getItem("access_token"))
        request.then(response => response.json()).then(data => {
            if (data.owner) {
                setOwner(data.owner);
            }
            return
        })
    }, [])

    const load_more = async e => {
        if (next) {
            let request = get(next, window.localStorage.getItem("access_token"))
            request.then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        setNext(data.next)
                        setResults([...results, ...data.results]);
                    })
                }
            })
        }
    }



    return <>
        <section className="section">
            <div className="container p-6">
                <h1 className="title has-text-grey-dark"><span className="icon is-small"><i className="fas fa-sm fa-bell"></i></span>&ensp;Notifications </h1>
                <hr />
                <div>
                    {
                        results.map(result => {
                            return <Notification
                                key={result.timestamp}
                                sourceID={result.source_id}
                                targetID={result.target_id}
                                timestamp={result.timestamp}
                                body={result.body}
                                type={result.type}
                                owner={owner}>
                            </Notification>
                        })
                    }
                    <div className="columns is-centered">
                        {next &&
                            <Button className="column" colorClass="is-info" value={"Load more notifications..."} handler={load_more}></Button>
                        }
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Notifications