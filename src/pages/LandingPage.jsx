/*
 * Landing Page
 * by Alex JPS
 * 2024-03-06
 *
 * Defines the landing page component,
 * which displays basic info about the program.
 */

// Packages
import React from 'react';

// Styles
import "../App.css";

// Components
import Button from "../components/Button";

function LandingPage() {
    /* This component displays the landing page.
     */
    return <div>
        <h1>
            Welcome to <span className={"code-text"}>tstat-web</span>!
        </h1>
        <p>
            This is a web-based interface for analyzing ticket metadata for UO Classroom Technology Support
        </p>
        <Button text={"Create Graph"} onClick={() => console.log("User clicked Create Graph")}/>

    </div>;
}

export default LandingPage;