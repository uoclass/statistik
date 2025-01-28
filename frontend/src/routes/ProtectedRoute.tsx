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

  // check if user is authenticated
  if (!token) {
    // not authenticated, go back to login page
    console.log("ProtectedRoute: tried to access but unauthorized, rerouting to invalid, token is ", token);
    return <Navigate to="/invalid" />;
  }

  // render the child routes
  console.log("ProtectedRoute: authenticated, forwarding to outlet, token is ", token);
  return <Outlet />;
};
