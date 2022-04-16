import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Button from "../../components/Common/button";
import { post } from "../../utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    const login_request = async e => {
        e.preventDefault();
        setIsLoading(true);
        let request = post("http://127.0.0.1:8000/accounts/api/login/",
            {
                username: username,
                password: password
            })
        request.then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    localStorage.setItem('access_token', data.access);
                    navigate("/")
                });
            } else if (response.status === 401) {
                response.json().then(data => {
                    setErrors([data.detail])
                });
            } else if (response.status === 400) {
                response.json().then(data => {
                    let err = []
                    for (const [key, value] of Object.entries(data)) {
                        err.push(`${key.charAt(0).toUpperCase()+key.slice(1)}: ${value}`)
                    }
                    setErrors(err)
                });
            }
        }).catch(err => {
            setErrors([err.toString()])
        }).finally(() => (setIsLoading(false)));
    };




    return <>
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-3">
                        <h1 className="title has-text-grey-dark has-text-centered">Login</h1>
                        <h2 className="subtitle has-text-centered is-size-6 is-underlined"><Link to="/register">Not a member?
                            Sign up now</Link></h2>
                        {/* input tags referenced from https://www.w3schools.com/html/html_form_input_types.asp */}
                        <form action="" className="box py-5" enctype="multipart/form-data">
                            <ul className="has-text-danger">
                                {errors.map(item => <li className="tag tag__custom is-danger mb-1" key={item}>{item}</li>)}
                            </ul>
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

                            <div className="column has-text-centered">
                                <div className="control">
                                    <Button styles={isLoading ? "is-loading" : ""} disabled={isLoading} value="Login" handler={login_request}></Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Login