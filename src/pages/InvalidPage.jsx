/*
 * Invalid Page
 * by Alex João Peterson Santos
 * 2024-11-06
 *
 * Defines the invalid page, which appears when an unauhenticated
 * user attempts to access a hidden page.
 */

// Packages
import React from "react";

// Styles
import "../App.css";

function InvalidPage() {
  /* This component displays the logout page.
   */
  return (
    <div>
      <h1>Invalid Page</h1>
      <p>
        You attempted to access a page that requires authentication. Please use
        the navigation bar to visit your desired page.
      </p>
    </div>
  );
}

export default InvalidPage;
