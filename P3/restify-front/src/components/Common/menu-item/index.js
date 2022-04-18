import React, { useState } from 'react';
import { put } from "../../../utils";

const MenuItem = ({ id, name, price, description, edit }) => {
    const [new_name, setName] = useState(name);
    const [new_price, setPrice] = useState(price);
    const [new_description, setDescription] = useState(description);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const save_item = async e => {
        // First check if the user is the owner before allowing them to change the menu
        e.preventDefault();
        setIsLoading(true);
        let request = put("http://127.0.0.1:8000/restaurants/api/restaurant/item/" + id + "/edit/",
            {
                name: new_name,
                price: new_price,
                description: new_description
            }, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 401) {
                // They shouldn't be unauthorized
            } else if (response.status === 400) {
                response.json().then(data => {
                    let err = []
                    for (const [key, value] of Object.entries(data)) {
                        err.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
                    }
                    setErrors(err)
                });
            }
        }).catch(err => {
            setErrors([err.toString()])
        }).finally(() => (setIsLoading(false)));
    };

    if (edit === "false") {
        return <div key={id}>
            <div className="columns" style={{ marginLeft: "5%", marginRight: "5%" }}>
                <div className="column is-narrow">
                    <h3 className="title is-4 has-text-grey-lighter">{name}</h3>
                </div>

                <div className="column is-paddingless">
                    <div style={{ borderBottom: "1px dashed #b2b2b2", paddingTop: "3%" }}>
                    </div>
                </div>

                <div className="column is-narrow has-pb-0">
                    <h3 className="title is-4 has-text-grey-lighter">${price}</h3>
                </div>
            </div>

            <div className="columns" style={{ marginLeft: "10%", marginRight: "5%" }}>
                <p>{description}</p>
            </div>

            <br></br>
        </div>
    } else {
        return <form key={id}>
            <div className='column is-centered'>
                <div className="column is-flex is-justify-content-center">
                    <ul className="has-text-danger">
                        {errors.map(item => <li className="tag tag__custom is-danger m-1" key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
            <div className="columns" style={{ marginLeft: "5%", marginRight: "5%" }}>
                <div className="column is-narrow">
                    <input className="title is-4" type="text" defaultValue={new_name} onChange={e => setName(e.target.value)} ></input>
                </div>
                <div className="column is-paddingless">
                    <div style={{ borderBottom: "1px dashed #b2b2b2", paddingTop: "3%" }}>
                    </div>
                </div>
                <div className="column is-narrow has-pb-0" style={{ marginRight: "12%" }}>
                    <h3 className="title is-4 has-text-grey-lighter">$
                        <input className="title is-4" type="text" defaultValue={new_price} style={{ width: "40px" }} onChange={e => setPrice(e.target.value)} ></input>
                    </h3>
                </div>
            </div>

            <div className="columns is-two-thirds" style={{ marginLeft: "10%", marginRight: "5%" }}>
                <textarea className="subtitle is-6" defaultValue={new_description} style={{ width: "1000px", height: "100px" }} onChange={e => setDescription(e.target.value)} ></textarea>
                <div className="column is-narrow" style={{ marginLeft: "12%" }}>
                    <button className={`button is-primary ${isLoading ? "is-loading" : ""}`} onClick={save_item} disabled={isLoading}>
                        <span className="icon-text">
                            <span className="icon">
                                <i className="far fa-save"></i>
                            </span>
                            <span>Save</span>
                        </span>
                    </button>
                </div>
            </div>

            <br />
        </form>
    }
}

export default MenuItem;