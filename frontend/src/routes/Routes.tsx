/*
 * Routes Index
 * by Alex JPS
 * 2024-04-26
 *
 * Defines routes for the app.
 */

import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import IpsumPage from "../pages/IpsumPage";
import UserDashboardPage from "../pages/UserDashboardPage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import InvalidPage from "../pages/InvalidPage";
import NotFoundPage from "../pages/NotFoundPage";
import ViewCreationPage from "../pages/ViewCreationPage";
import Layout from "../components/Layout";
import ConditionalRoute from "./ConditionalRoute";
import ProtectedRouteError from "../components/ProtectedRouteError";
import UserGuidePage from "@/pages/UserGuidePage";

function Routes() {
  // route configurations go here
  const routesProtected = [
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/dashboard",
          element: <UserDashboardPage />,
        },
        {
          path: "/new-view",
          element: <ViewCreationPage />,
        },
      ],
      errorElement: <ProtectedRouteError />,
    },
  ];

  const routesPublic = [
    {
      element: (
        <ConditionalRoute
          redirect={"/dashboard"}
          redirectOnAuthenticated={true}
        />
      ),
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
      ],
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/ipsum",
      element: <IpsumPage />,
    },
    {
      path: "/user-guide",
      element: <UserGuidePage />,
    },
    {
      path: "/invalid",
      element: <InvalidPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/logout",
      element: <LogoutPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  // decide which routes are available to user based on authentication status
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [...routesPublic, ...routesProtected],
    },
  ]);

  return router;
}

export default Routes;
