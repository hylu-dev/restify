import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const submit_search = e => {
        console.log(e)
        if (e.keyCode === 13 || e.type === 'click') {
            
            navigate(`/browse/?query=${query}`)
        }
    }

    return <>
        <div className="field has-addons">
            <div className="control">
                <input className="input" type="search" placeholder="Search..." onChange={e => setQuery(e.target.value)} onKeyDown={submit_search} />
            </div>
            <div className="control">
                <button className="button is-primary is-light" onClick={submit_search}>
                    <span className="icon is-small is-right"><i className="fas fa-search"></i></span>
                </button>
            </div>
        </div>
    </>
}

export default Search