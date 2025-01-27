/*
 * Anonymous Route Component
 * by Eric Edwards
 * 2025-01-27
 *
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
export const AnonymousRoute = () => {
  const { token } = useAuth();

  console.log("in anon route, value of token is ", token);

  if (token) {
    return <Navigate to="/invalid" />;
  }

  // render the child routes
  console.log("User is unauthenticated, rendering outlet");
  return <Outlet />;
};
