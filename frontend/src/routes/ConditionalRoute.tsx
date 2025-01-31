/*
 * Conditional Route Component
 * by Alex João Peterson Santos
 * 2025-01-29
 *
 * Conditionally renders the dashboard or landing page based on authentication status
 */

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

interface ConditionalRouteProps {
  redirect: string;
  redirectOnAuthenticated: boolean;
}

const ConditionalRoute = ({redirect, redirectOnAuthenticated}: ConditionalRouteProps) => {
  const {token} = useAuth();

  if ((token && redirectOnAuthenticated) || (!token && !redirectOnAuthenticated)) {
    return <Navigate to={redirect}/>;
  }

  // render the child routes
  return <Outlet/>;
}

export default ConditionalRoute;