import React, { useState } from 'react';
import Button from "../../components/Common/button";
import { post_form } from "../../utils";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [errors, setErrors] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const submit_request = async e => {
        e.preventDefault();
        setErrors([])
        setIsLoading(true);
        let payload = new FormData();
        payload.append('username', username);
        payload.append('password', password);
        payload.append('password2', password2);
        payload.append('email', email);
        payload.append('phone', phone);
        payload.append('first_name', firstName);
        payload.append('last_name', lastName);
        payload.append('avatar', avatar);

        let request = post_form("http://127.0.0.1:8000/accounts/api/register/", payload)
        request.then(response => {
            if (response.status === 201) {
                response.json().then(data => {
                    navigate("/login");
                });
            } else if (response.status === 400) {
                response.json().then(data => {
                    console.log(data)
                    let err = []
                    for (const [key, value] of Object.entries(data)) {
                        if (key === "password2") {
                            err.push(`Confirm Password: ${value}`)
                        } else if (key === "avatar") {
                            err.push(`Avatar: The submitted file is not supported.`)
                        } else {
                            err.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
                        }
                    }
                    setErrors(err)
                });
            }
        }).catch(err => {
            setErrors([err.toString()])
        }).finally(() => (setIsLoading(false)));
    }

    return <>
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4">
                        <h1 className="title has-text-grey-dark has-text-centered">Create an Account</h1>
                        <h2 className="subtitle has-text-centered is-size-6 is-underlined"><Link to="/login">Already have an account?</Link></h2>
                        {/* input tags referenced from https://www.w3schools.com/html/html_form_input_types.asp */}
                        <form action="" className="box py-5" encType="multipart/form-data">
                            <ul className="has-text-danger">
                                {errors.map(item => <li className='tag tag__custom is-danger mb-1' key={item}>{item}</li>)}
                            </ul>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label htmlFor="fname" className="label">First Name</label>
                                        <p className="control">
                                            <input type="text" id="fname" name="fname" className="input"
                                                placeholder="John" onChange={e => setFirstName(e.target.value)} />
                                        </p>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="lname" className="label">Last Name</label>
                                        <p className="control">
                                            <input type="text" id="lname" name="lname" className="input"
                                                placeholder="Doe" onChange={e => setLastName(e.target.value)} />
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
                                    <input type="email" id="email" name="email" className="input"
                                        placeholder="john@doe.com" onChange={e => setEmail(e.target.value)} />
                                </p>
                            </div>
                            <div className="field">
                                <label htmlFor="phone" className="label">Phone</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-phone"></i>
                                    </span>
                                    <input type="tel" id="phone" name="phone" className="input"
                                        placeholder="999-999-9999" onChange={e => setPhone(e.target.value)} />
                                </p>
                            </div>

                            <hr />

                            <div className="field">
                                <label htmlFor="username" className="label">Username</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <input type="text" id="username" name="username" className="input"
                                        placeholder="Username" onChange={e => setUsername(e.target.value)} />
                                </p>

                            </div>
                            <div className="field">
                                <label htmlFor="password" className="label">Password</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                    <input type="password" id="password" name="password" className="input"
                                        placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                </p>
                            </div>


                            <div className="field">
                                <label htmlFor="confirm_password" className="label">Confirm Password</label>
                                <p className="control has-icons-left">
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-key"></i>
                                    </span>
                                    <input type="password" id="confirm_password" name="confirm_password" className="input"
                                        placeholder="Repeat Password" onChange={e => setPassword2(e.target.value)} />
                                </p>
                            </div>


                            <div className="field">
                                <div className="level">
                                    <label htmlFor="file" className="label">Upload a Profile Picture</label>
                                </div>
                                <figure className="image is-128x128 box p-2">
                                    <img className='preview-image' src={avatar ? URL.createObjectURL(avatar) : ""} alt="" />
                                </figure>
                                <div className="file level">
                                    <label className="file-label">
                                        <input className="file-input" type="file" accept="image/png, image/jpeg" name="file"
                                            onChange={e => setAvatar(e.target.files[0])} />
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

                            <div className="column has-text-centered">
                                <h2 className='has-text-danger'>{errors.length ? "Please fix errors." : ""}</h2>
                            </div>

                            <div className="column has-text-centered">
                                <div className="control">
                                    <Button styles={isLoading ? "is-loading" : ""} disabled={isLoading} value="Submit" handler={submit_request}></Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Register