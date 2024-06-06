/*
 * Logout Page
 * by Alex JPS
 * 2024-05-02
 *
 * Defines the logout page, which just
 * removes the user's token and redirects them.
 */

// Packages
import React from 'react';
import { useNavigate } from "react-router-dom";

// Styles
import "../App.css";

import { useAuth } from "../provider/AuthProvider";

function LogoutPage() {
    /* This component displays the logout page.
     */
    const { setToken } = useAuth();
    const navigate = useNavigate();

    // FIXME use login tutorial to implement logout functionality
    const handleLogout = () => {
        setToken();
        navigate("/", {replace: true});
    };

    setTimeout(() => {
        handleLogout();
    }, 1 * 1000);

    return <div>
        <h1>
            Logout Page
        </h1>
        <p>
            This is the logout page, which should only be visible to authenticated users and
            immediately redirects them to the landing page.
        </p>
    </div>;
}

export default LogoutPage;