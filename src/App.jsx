/*
 * React App Component
 * by Alex JPS, Eric Edwards
 * 2024-03-06
 *
 * Defines the App component and its routing.
 */

// Packages
import React, {useEffect} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {logRoles} from "@testing-library/react";

// Pages
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import IpsumPage from "./pages/IpsumPage";

// Styles
import "./App.css";

function App() {
    /* This component serves as the root of the app.
     */
    useEffect(() => {document.body.classList.add('gray-background')}, []);
    return <div className="App">
        <AppHeader />
        <AppBody />
        <AppFooter />
    </div>;
}

function AppBody() {
    /* Decide which component to display based on the URL
     */
    return <div className={"App-body"}>
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/ipsum" element={<IpsumPage />} />
            </Routes>
        </BrowserRouter>
    </div>;
}

function AppHeader() {
    /* This component displays the header.
     */
    return <header className={"App-header"}>
        tStat
    </header>;
}

function AppFooter() {
    /* This component displays the footer.
     */
    return <footer className={"App-footer"}>
        <p>
            For exclusive use by UO Classroom Technology Support.
            <br/>
            Developed by Eric Edwards and Alex JPS.</p>
    </footer>;
}

// Export the App component for rendering by index.jsx
export default App;
