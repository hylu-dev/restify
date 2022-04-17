import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { get, post_form } from "../../utils";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/button";

const CreateRestaurant = () => {
    const [userID, setUserID] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [postal, setPostal] = useState("");
    const [phone, setPhone] = useState("");
    const [logo, setLogo] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let request = get("http://127.0.0.1:8000/accounts/api/user/auth/", window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setUserID(data.id);
                })
            }
        })
    }, [])

    const submit_request = async e => {
        e.preventDefault();
        setErrors([])
        setIsLoading(true);
        let payload = new FormData();
        payload.append('name', name);
        payload.append('description', description);
        payload.append('address', address);
        payload.append('postal_code', postal);
        payload.append('phone_number', phone);
        payload.append('logo', logo);

        let request = post_form("http://127.0.0.1:8000/restaurants/api/restaurant/create/", payload, window.localStorage.getItem("access_token"))
        request.then(response => {
            console.log(response)
            if (response.status === 201) {
                response.json().then(data => {
                    navigate("/profile");
                });
            } else if (response.status === 400) {
                response.json().then(data => {
                    let err = []
                    console.log(data)
                    for (const [key, value] of Object.entries(data)) {
                        if (key === "Logo") {
                            err.push(`Logo: The submitted file is not supported.`)
                        } else {
                            err.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
                        }
                    }
                    setErrors(err)
                });
            } else {
                response.json().then(data => { console.log(data) });
            }
        }).catch(err => {
            setErrors([err.toString()])
        }).finally(() => (setIsLoading(false)));
    }

    return <>
        <section className="section">
            <div className="container box p-6">
                <h1 className="title has-text-grey-dark">Edit Restaurant</h1>
                <hr />
                <div className="columns is-centered">
                    <div className="column is-3">
                        <p className="is-size-5">Add or update your restaurant information.</p>
                        <Link to="/profile"><button className="button is-info my-5">Back</button></Link>
                    </div>

                    <div className="column is-9">
                        <form action="">
                            <h2 className="subtitle is-size-3">Restaurant Information</h2>

                            <div className="field">
                                <label htmlFor="rname" className="label">Restaurant Name</label>
                                <input type="text" id="rname" name="rname" className="input" placeholder="Restaurant Name"
                                    defaultValue={name} onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="rname" className="label">Description</label>
                                <textarea className="textarea has-fixed-size" name="description" id="description" cols="30" rows="4"
                                    placeholder="Description" defaultValue={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>

                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label htmlFor="address" className="label">Address</label>
                                        <p className="control">
                                            <input type="text" id="address" name="address" className="input" placeholder="221B Baker Street"
                                                defaultValue={address} onChange={e => setAddress(e.target.value)} />
                                        </p>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="pcode" className="label">Postal Code</label>
                                        <p className="control">
                                            <input type="text" id="pcode" name="pcode" className="input" placeholder="XXXXXX"
                                                defaultValue={postal} onChange={e => setPostal(e.target.value)} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="rphone" className="label">Phone</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-phone"></i>
                                    </span>
                                    <input type="tel" id="rphone" name="rphone" className="input" placeholder="999-999-9999"
                                        defaultValue={phone} onChange={e => setPhone(e.target.value)} />
                                </p>
                            </div>

                            <div className="field">
                                <div className="level">
                                    <label htmlFor="rphone" className="label">Upload a logo</label>

                                </div>
                                <figure className="image is-128x128 box p-2">
                                    <img className='preview-image' src={logo ? URL.createObjectURL(logo) : ""} alt="" />
                                </figure>
                                <div className="file level">
                                    <label className="file-label">
                                        <input className="file-input" type="file" name="resume"
                                            defaultValue={logo} onChange={e => setLogo(e.target.files[0])}
                                        />
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
                        </form>

                        <div className="column p-0 mt-5">
                            <ul className="has-text-danger">
                                {errors.map(item => <li className="tag tag__custom is-danger mb-1" key={item}>{item}</li>)}
                            </ul>
                        </div>

                        <div className="control py-5">
                            <Button styles={isLoading ? "is-loading" : ""} disabled={isLoading} value="Submit" handler={submit_request}></Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </>
}

export default CreateRestaurant