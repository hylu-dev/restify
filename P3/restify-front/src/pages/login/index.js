//import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    return <>
        <section class="section">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-3">
                        <h1 class="title has-text-grey-dark has-text-centered">Login</h1>
                        <h2 class="subtitle has-text-centered is-size-6 is-underlined"><Link to="/signup">Not a member?
                                Sign up now</Link></h2>
                        {/* input tags referenced from https://www.w3schools.com/html/html_form_input_types.asp */}
                        <form action="" class="box py-5">
                            <div class="field">
                                <label for="username" class="label">Username</label>
                                <p class="control has-icons-left">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <input type="text" id="username" name="username" class="input" placeholder="Username"/>
                                </p>
                            </div>
                            <div class="field">
                                <label for="password" class="label">Password</label>
                                <p class="control has-icons-left">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-key"></i>
                                    </span>
                                    <input type="password" id="password" name="password" class="input"
                                        placeholder="Password"/>
                                </p>
                            </div>

                            <div class="column has-text-centered">
                                <div class="control">
                                    <input class="button is-primary" type="submit" value="Login"/>
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