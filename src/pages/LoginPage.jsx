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

// Styles
import "../App.css";

import { useAuth } from "../provider/AuthProvider";

function LoginPage() {
    /* This component displays the login page.
     */
    const { setToken } = useAuth();
    const navigate = useNavigate();

    // FIXME use login tutorial to implement login functionality
    const handleLogin = () => {
        setToken("this is a test token");
        navigate("/", {replace: true});
    };

    setTimeout(() => {
        handleLogin();
    }, 3 * 1000);

    return <div>
        <h1>
            Login Page
        </h1>
        <p>
            This is the login page, which should only be visible to unauthenticated users (i.e. before login).
        </p>
    </div>;
}

export default LoginPage;