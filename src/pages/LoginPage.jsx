/*
 * Login Page
 * by Alex JPS
 * 2024-05-02
 *
 * Defines the login page component,
 * A page only visible to unauthenticated users.
 */

// Packages
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Styles
import "../App.css";

import { useAuth } from "../provider/AuthProvider";


/* This needs to be refactored because it makes hook calls but is not a react compnenent.
function HandleLogin() {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    console.log("Logging in...");
    setToken("this is a test token");
    navigate("/", {replace: true});
    return null;
}
*/

/* This component displays the login page.
 */
function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const onButtonClick = () => {
        // set initial error values to empty
        setEmailError("");
        setPasswordError("");

        // make sure that fields were correctly filled out
        if (email === "") {
            setEmailError("Please enter your email address");
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        if (password === "") {
            setPasswordError("Please enter your password");
        }

        // make calls to verify authentication here
        // NOTE could add an api endpoint and check here for whether an account exists

        HandleLogin()
    }

    const HandleLogin = () => {
        fetch('http://localhost:3080/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        })
            .then((response) => response.json())
            .then(response => {
                if ('success' === response.message) {
                    localStorage.setItem('token', response.token);
                    window.alert("The login was successful");
                    navigate('/');
                } else {
                    window.alert(response.error);
                }
            })
    }

    return (
        <>
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={email}
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    className={"inputBox"}
                />
                <br />
                <label className={"errorLabel"}>{emailError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={"inputBox"}
                />
                <br />
                <label className={"errorLabel"}>{passwordError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input className={"inputButton"} type="button" onClick={onButtonClick} value="Login" />
            </div>
        </>
    )
}

export default LoginPage;