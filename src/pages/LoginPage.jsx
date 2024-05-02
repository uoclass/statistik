/*
 * User Dashboard Page
 * by Alex JPS
 * 2024-05-02
 *
 * Defines the user dashboard page component,
 * a protected page which displays info upon login.
 */

// Packages
import React from 'react';

// Styles
import "../App.css";

function LoginPage() {
    /* This component displays the landing page.
     */
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