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

function UserDashboardPage() {
    /* This component displays the landing page.
     */
    return <div>
        <h1>
            User Dashboard
        </h1>
        <p>
            This is the user dashboard, which should only be visible after login.
        </p>
    </div>;
}

export default UserDashboardPage;