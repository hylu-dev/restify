import React, { useEffect, useState } from "react";
import { post } from "../../../utils";
import Button from "../button";

const Modal = ({ setIsOpen }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const add_item = async e => {
        e.preventDefault();
        setIsLoading(true);
        let request = post("http://127.0.0.1:8000/restaurants/api/restaurant/item/add/",
            {
                name: name,
                price: price,
                description: description
            }, window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 201) {
                // Success! Close modal and reload
                setIsOpen(false);
            } else if (response.status === 401) {
                response.json().then(data => {
                    setErrors([data.detail])
                });
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

    return (
    <>
        <section className="container">
            <div className="modal is-active">
                <div className="modal-background">
                <div class="modal-card">
                    <header class="modal-card-head">
                    <h1 class="modal-card-title">Add Item</h1>
                    <button class="delete" aria-label="close" onClick={() => setIsOpen(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        <form action="" encType="multipart/form-data">
                            <ul className="has-text-danger">
                                {errors.map(item => <li className="tag tag__custom is-danger mb-1" key={item}>{item}</li>)}
                            </ul>
                            <div className="columns">
                                <div className="column is-three-quarters">
                                    <label htmlFor="Item name" className="label">Item Name</label>
                                    <input type="text" id="itemname" name="itemname" className="input"
                                        placeholder="Item Name" onChange={e => setName(e.target.value)} />
                                </div>
                                <div className="column is-one-quarter">
                                    <label htmlFor="Price" className="label">Price</label>
                                    <input type="number" id="price" name="price" className="input"
                                        placeholder="Price" onChange={e => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="column">
                                <label htmlFor="Item description" className="label">Item Description</label>
                                <textarea rows="5" type="text" id="itemdescription" name="itemdescription" className="input"
                                    placeholder="Item Description" onChange={e => setDescription(e.target.value)} />
                            </div>
                        </form>
                    </section>
                    <footer class="modal-card-foot">
                        <Button styles={isLoading ? "is-loading" : ""} disabled={isLoading} value="Add Item" handler={ add_item }></Button>
                        <button class="button" onClick={() => setIsOpen(false)}>Cancel</button>
                    </footer>
                </div>
                </div>
            </div>
        </section>
    </>
    );
};

export default Modal;