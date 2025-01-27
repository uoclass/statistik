/*
 * Protected Route Component
 * by Alex JPS
 * 2024-04-26
 *
 * Defines routes for the app.
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  console.log("in protected route, value of token is ", token);

  // check if user is authenticated
  if (!token) {
    // not authenticated, go back to login page
    console.log("User is not authenticated, redirecting by protected route");
    return <Navigate to="/invalid" />;
  }

  // render the child routes
  console.log("User is authenticated, rendering outlet");
  return <Outlet />;
};
