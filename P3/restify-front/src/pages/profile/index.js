import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

const Profile = () => {

    useEffect(() => {
        console.log("value of celsius changed to ")
    })

    const logout = () => {
        window.localStorage.removeItem("access_token");
    }

    return <>
        <section className="section">
            <div className="container box p-6">
                <h1 className="title has-text-grey-dark">Account</h1>
                <hr/>
                    <div className="columns is-centered">
                        <div className="column is-3">
                            <p className="is-size-5">View and update your account information.</p>
                            <Link to="/login" onClick={logout}><button className="button is-danger my-5">Log Out</button></Link>
                        </div>
                        <div className="column is-9">
                            <h2 className="subtitle is-size-3">My Restaurant</h2>
                            <h3>You do not currently have a restaurant set up</h3>
                            <a href="restaurant-create.html"><button className="button is-info my-5">Create a Restaurant</button></a>

                            <form action="">
                                <h2 className="subtitle is-size-3">Personal Information</h2>
                                <div className="field is-horizontal">
                                    <div className="field-body">
                                        <div className="field">
                                            <label htmlFor="fname" className="label">First Name</label>
                                            <p className="control">
                                                <input type="text" id="fname" name="fname" className="input" placeholder="John" value="John"/>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="lname" className="label">Last Name</label>
                                            <p className="control">
                                                <input type="text" id="lname" name="lname" className="input" placeholder="Doe" value="Doe"/>
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
                                        <input type="email" id="email" name="email" className="input" placeholder="john@doe.com" value="john@doe.com"/>
                                    </p>
                                </div>
                                <div className="field">
                                    <label htmlFor="phone" className="label">Phone</label>
                                    <p className="control has-icons-left">
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-phone"></i>
                                        </span>
                                        <input type="tel" id="phone" name="phone" className="input" placeholder="999-999-9999" value="999-999-9999"/>
                                    </p>
                                </div>

                                <hr/>

                                    <h2 classNameName="subtitle is-size-3">Credentials</h2>

                                    <div classNameName="field">
                                        <label htmlFor="username" classNameName="label">Username</label>
                                        <p classNameName="control has-icons-left">
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-user"></i>
                                            </span>
                                            <input type="text" id="username" name="username" className="input" placeholder="Username" value="jdoe"/>
                                        </p>

                                    </div>
                                    <div className="field">
                                        <label htmlFor="old_password" className="label">Current password</label>
                                        <p className="control has-icons-left">
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-key"></i>
                                            </span>
                                            <input type="password" id="old_password" name="old_password" className="input" placeholder="Enter your current password"/>
                                        </p>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="password" className="label">New Password</label>
                                        <p className="control has-icons-left">
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-key"></i>
                                            </span>
                                            <input type="password" id="password" name="password" className="input" placeholder="Enter your new password"/>
                                        </p>
                                    </div>


                                    <div className="field">
                                        <label htmlFor="avatar" className="label">Avatar</label>
                                        <div className="buttons">
                                            <button className="button">
                                                <span className="icon is-large has-text-grey-dark">
                                                    <i className="fas fa-male fa-2x"></i>
                                                </span>
                                            </button>
                                            <button className="button">
                                                <span className="icon is-large has-text-grey-dark">
                                                    <i className="fas fa-female fa-2x"></i>
                                                </span>
                                            </button>
                                            <button className="button">
                                                <span className="icon is-large has-text-grey-dark">
                                                    <i className="fas fa-apple-alt fa-2x"></i>
                                                </span>
                                            </button>
                                            <button className="button">
                                                <span className="icon is-large has-text-grey-dark">
                                                    <i className="fas fa-lemon fa-2x"></i>
                                                </span>
                                            </button>
                                            <button className="button">
                                                <span className="icon is-large has-text-grey-dark">
                                                    <i className="fas fa-cookie fa-2x"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="control py-5">
                                        <input className="button is-primary" type="submit" value="Save Changes"/>
                                    </div>
                            </form>
                        </div>
                    </div>

            </div>
        </section>
    </>
}

export default Profile