//import React, {useEffect, useState} from 'react';

const Register = () => {
    return <>
        <section class="section">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-4">
                        <h1 class="title has-text-grey-dark has-text-centered">Create an Account</h1>
                        <h2 class="subtitle has-text-centered is-size-6 is-underlined"><a href="login.html">Already have an account?</a></h2>
                        {/* input tags referenced from https://www.w3schools.com/html/html_form_input_types.asp */}
                        <form action="" class="box py-5">

                            <div class="field is-horizontal">
                                <div class="field-body">
                                    <div class="field">
                                        <label for="fname" class="label">First Name</label>
                                        <p class="control">
                                            <input type="text" id="fname" name="fname" class="input" placeholder="John"/>
                                        </p>
                                    </div>
                                    <div class="field">
                                        <label for="lname" class="label">Last Name</label>
                                        <p class="control">
                                            <input type="text" id="lname" name="lname" class="input" placeholder="Doe"/>
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div class="field">
                                <label for="email" class="label">Email</label>
                                <p class="control has-icons-left">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    <input type="email" id="email" name="email" class="input" placeholder="john@doe.com"/>
                                </p>
                            </div>
                            <div class="field">
                                <label for="phone" class="label">Phone</label>
                                <p class="control has-icons-left">
                                    <span class="icon is-small is-left">
                                        <i class="fas fa-phone"></i>
                                    </span>
                                    <input type="tel" id="phone" name="phone" class="input" placeholder="999-999-9999"/>
                                </p>
                            </div>

                            <hr/>

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
                                        <input type="password" id="password" name="password" class="input" placeholder="Password"/>
                                    </p>
                                </div>


                                <div class="field">
                                    <label for="confirm_password" class="label">Confirm Password</label>
                                    <p class="control has-icons-left">
                                        <span class="icon is-small is-left">
                                            <i class="fas fa-key"></i>
                                        </span>
                                        <input type="password" id="confirm_password" name="confirm_password" class="input" placeholder="Password"/>
                                    </p>
                                </div>


                                <div class="field">
                                    <label for="avatar" class="label">Avatar</label>
                                    <div class="buttons">
                                        <button class="button">
                                            <span class="icon is-large has-text-grey-dark">
                                                <i class="fas fa-male fa-2x"></i>
                                            </span>
                                        </button>
                                        <button class="button">
                                            <span class="icon is-large has-text-grey-dark">
                                                <i class="fas fa-female fa-2x"></i>
                                            </span>
                                        </button>
                                        <button class="button">
                                            <span class="icon is-large has-text-grey-dark">
                                                <i class="fas fa-apple-alt fa-2x"></i>
                                            </span>
                                        </button>
                                        <button class="button">
                                            <span class="icon is-large has-text-grey-dark">
                                                <i class="fas fa-lemon fa-2x"></i>
                                            </span>
                                        </button>
                                        <button class="button">
                                            <span class="icon is-large has-text-grey-dark">
                                                <i class="fas fa-cookie fa-2x"></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div class="column has-text-centered"><div class="control">
                                    <input class="button is-primary" type="submit" value="Submit"/>
                                </div></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Register