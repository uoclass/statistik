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

/* This component displays the login page.
 */
function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

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

        handleLogin()
    }

    const validateToken = async (token) => {
        console.log(`Sending token validation request to ${process.env.REACT_APP_API_URL}/api/verify`);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token}),
            });
            const data = await response.json();
            if (data.message === "valid token") {
                console.log("Token is valid");
                return true;
            }
        } catch (error) {
            console.error("Could not validate token: ", error);
            return false;
        }
    }

    const handleLogin = async () => {
        setLoading(true);
        console.log(`Sending login request to ${process.env.REACT_APP_API_URL}/api/auth`);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if (data.message === "login success") {
                // the login was successful
                localStorage.setItem('token', data.token);
                window.alert("The login was successful");
                // make sure the token is valid and go to the dashboard
                const isValid = await validateToken(data.token);
                if (isValid) {
                    // wait for 3 seconds
                    navigate("/dashboard");
                } else {
                    window.alert("Token validation failed.");
                }
            } else {
                window.alert(`The login failed with the following error:\n\n${data.error}`);
            }
        } catch (error) {
            console.error("Could not login: ", error);
            window.alert("An error occurred while trying to login.");
        } finally {
            setLoading(false);
        }
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
                <label className={"error-label"}>{emailError}</label>
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
                <label className={"error-label"}>{passwordError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input className={"inputButton"} type="button" onClick={onButtonClick} value="Login" />
            </div>
        </>
    )
}

export default LoginPage;
