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

// Routing
import AuthProvider from "./provider/AuthProvider";
import Routes from "./routes/index";

// Styles
import "./App.css";

function App() {
    /* This component serves as the root of the app.
     */
    useEffect(() => {document.body.classList.add('gray-background')}, []);
    return <div className="App">
        <AppHeader />
        <div className="App-body">
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </div>
        <AppFooter />
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