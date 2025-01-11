/*
 * Not Found Page
 * by Alex João Peterson Santos
 * 2024-11-06
 *
 * Defines the not found page, which appears when a
 * user attempts to access a page that does not exist.
 */

// Packages
import React from "react";
import { useLocation } from "react-router-dom";

// Styles

function NotFoundPage() {
  /* This component displays the logout page.
   */

  const location = useLocation();
  let firstSlashIndex = location.pathname.indexOf("/");
  let pathname;
  if (firstSlashIndex === -1) {
    pathname = location.pathname;
  } else {
    pathname = location.pathname.substring(firstSlashIndex + 1);
  }

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page "{pathname}" does not exist. Some would call this a 404.</p>
    </div>
  );
}

export default NotFoundPage;
