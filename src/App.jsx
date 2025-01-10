/*
 * React App Component
 * by Alex JPS, Eric Edwards
 * 2024-03-06
 *
 * Defines the App component and its routing.
 */

// Packages
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

// Routing
import AuthProvider from "./provider/AuthProvider";
import Routes from "./routes/index";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/Nav";

// Styles
import "./App.css";

function App() {
  /* This component serves as the root of the app.
   */
  useEffect(() => {
    document.body.classList.add("white-background");
  }, []);
  return (
    <div className="App">
      <div className="App-content">
        <Header />
        <Nav />
        <div className="App-body">
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// Export the App component for rendering by index.jsx
export default App;
