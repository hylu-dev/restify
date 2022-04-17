import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { get, put_form } from "../../utils";
import Button from "../../components/Common/button";

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [oldAvatar, setOldAvatar] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [owner, setOwner] = useState("");
    const [logo, setLogo] = useState("");
    const [rName, setRName] = useState("");

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const logout = () => {
        window.localStorage.removeItem("access_token");
    }

    useEffect(() => {
        let request = get("http://127.0.0.1:8000/accounts/api/user/auth/", window.localStorage.getItem("access_token"))
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setUsername(data.username);
                    setEmail(data.email);
                    setPhone(data.phone_number);
                    setOldAvatar(data.avatar);
                    setAvatar(data.avatar);
                    setOwner(data.owner);
                })
            }
        })
    }, [])

    const get_restaurant = async e => {
        let request = get(`http://127.0.0.1:8000/restaurants/api/restaurant/${owner}/details/`)
        request.then(response => {
            response.json()
        }).then(data => {
            console.log(data);
        })
    }

    const submit_request = async e => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        let payload = new FormData();
        payload.append('password', password);
        payload.append('password2', password2);
        payload.append('email', email);
        payload.append('phone', phone);
        payload.append('first_name', firstName);
        payload.append('last_name', lastName);
        if (oldAvatar !== avatar) payload.append('avatar', avatar);

        let request = put_form("http://127.0.0.1:8000/accounts/api/profile/edit/", payload, window.localStorage.getItem("access_token"))
        request.then(response => {
            console.log(response)
            if (response.status === 201) {
                response.json().then(data => {

                });
            } else if (response.status === 400) {
                response.json().then(data => {
                    let err = []
                    console.log(data)
                    for (const [key, value] of Object.entries(data)) {
                        if (key === "password2") {
                            err.push(`New Password: ${value}`)
                        } else if (key === "avatar") {
                            err.push(`Avatar: The submitted file is not supported.`)
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
                <h1 className="title has-text-grey-dark">Account</h1>
                <hr />
                <div className="columns is-centered">
                    <div className="column is-3">
                        <p className="is-size-5">View and update your account information.</p>
                        <Link to="/login" onClick={logout}><button className="button is-danger my-5">Log Out</button></Link>
                    </div>
                    <div className="column is-9">
                        <h2 className="subtitle is-size-3">My Restaurant</h2>
                        <figure className="image is-128x128">
                            <img className='preview-image' src={
                                avatar ? (typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)) : ""
                            } alt="" />
                        </figure>
                        <h3>{owner ? "" : 'You do not currently have a restaurant set up.'}</h3>
                        <Link to="/restaurant/create"><button className="button is-info my-5">
                            {owner ? "Edit Restaurant" : 'Create Restaurant'}</button></Link>

                        <form action="" encType="multipart/form-data">
                            <h2 className="subtitle is-size-3">Personal Information</h2>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label htmlFor="fname" className="label">First Name</label>
                                        <p className="control">
                                            <input type="text" id="fname" name="fname" className="input" placeholder="John"
                                                defaultValue={firstName} onChange={e => setFirstName(e.target.value)} />
                                        </p>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="lname" className="label">Last Name</label>
                                        <p className="control">
                                            <input type="text" id="lname" name="lname" className="input" placeholder="Doe"
                                                defaultValue={lastName} onChange={e => setLastName(e.target.value)} />
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="field">
                                <label htmlFor="email" className="label">Email</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                    <input type="email" id="email" name="email" className="input" placeholder="john@doe.com"
                                        defaultValue={email} onChange={e => setEmail(e.target.value)} />
                                </p>
                            </div>
                            <div className="field">
                                <label htmlFor="phone" className="label">Phone</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-phone"></i>
                                    </span>
                                    <input type="tel" id="phone" name="phone" className="input" placeholder="999-999-9999"
                                        defaultValue={phone} onChange={e => setPhone(e.target.value)} />
                                </p>
                            </div>

                            <hr />

                            <h2 className="subtitle is-size-3">Credentials</h2>

                            <div className="field">
                                <label htmlFor="username" className="label">Username</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <input type="text" id="username" name="username" className="input" placeholder="Username"
                                        defaultValue={username} disabled />
                                </p>

                            </div>
                            <div className="field">
                                <label htmlFor="old_password" className="label">Current password</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                    <input type="password" id="old_password" name="old_password" className="input" placeholder="Enter your current password"
                                        defaultValue={password} onChange={e => setPassword(e.target.value)} />
                                </p>
                            </div>
                            <div className="field">
                                <label htmlFor="password" className="label">New Password</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                    <input type="password" id="password" name="password" className="input" placeholder="Enter your new password"
                                        defaultValue={password2} onChange={e => setPassword2(e.target.value)} />
                                </p>
                            </div>


                            <div className="field">
                                <div className="level">
                                    <label htmlFor="file" className="label">Upload a Profile Picture</label>
                                </div>
                                <figure className="image is-128x128 box p-2">
                                    <img className='preview-image' src={
                                        avatar ? (typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)) : ""
                                    } alt="" />
                                </figure>
                                <div className="file level">
                                    <label className="file-label">
                                        <input className="file-input" type="file" accept="image/png, image/jpeg" name="file"
                                            defaultValue={avatar} onChange={e => setAvatar(e.target.files[0])} />
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

                            <div className="column p-0">
                                <ul className="has-text-danger">
                                    {errors.map(item => <li className="tag tag__custom is-danger mb-1" key={item}>{item}</li>)}
                                </ul>
                            </div>

                            <div className="control py-5">
                                <Button styles={isLoading ? "is-loading" : ""} disabled={isLoading} value="Save Changes" handler={submit_request}></Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    </>
}

export default Profile