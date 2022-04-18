import React, { useState } from "react";
import { post_form } from "../../../utils";
import Button from "../../../components/Common/button";

const Modal = ({ setIsOpen }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const add_photo = async e => {
        e.preventDefault();
        setErrors([])
        setIsLoading(true);
        let payload = new FormData();
        payload.append('name', name);
        payload.append('image', image);

        let request = post_form("http://127.0.0.1:8000/restaurants/api/restaurant/photo/add/", payload, window.localStorage.getItem("access_token"))
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
                    <h1 class="modal-card-title">Add Photo</h1>
                    <button class="delete" aria-label="close" onClick={() => setIsOpen(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        <form action="" encType="multipart/form-data">
                            <ul className="has-text-danger">
                                {errors.map(item => <li className="tag tag__custom is-danger mb-1" key={item}>{item}</li>)}
                            </ul>
                            <div className="columns">
                                <div className="column">
                                    <label htmlFor="Photo name" className="label">Photo Name</label>
                                    <input type="text" id="photoname" name="photoname" className="input"
                                        placeholder="Photo Name" onChange={e => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <div className="level">
                                        <label htmlFor="file" className="label">Upload a Photo</label>
                                    </div>
                                    <figure className="image is-128x128 box p-2">
                                        <img className='preview-image' src={image ? URL.createObjectURL(image) : ""} alt="" />
                                    </figure>
                                    <div className="file level">
                                        <label className="file-label">
                                            <input className="file-input" type="file" accept="image/png, image/jpeg" name="file"
                                                onChange={e => setImage(e.target.files[0])} />
                                            <span className="file-cta">
                                                <span className="file-icon">
                                                    <i className="fas fa-upload"></i>
                                                </span>
                                                <span className="file-label">
                                                    Choose a file…
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                    <footer class="modal-card-foot">
                        <Button styles={isLoading ? "is-loading" : ""} disabled={isLoading} value="Add Photo" handler={ add_photo }></Button>
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