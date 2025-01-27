/*
 * Routes Index
 * by Alex JPS
 * 2024-04-26
 *
 * Defines routes for the app.
 */

import { createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
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

function Routes() {
  const { token } = useAuth();

  // route configurations go here

  const routesHidden = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <UserDashboardPage />,
        },
        {
          path: "/dashboard",
          element: <UserDashboardPage />,
        },
        {
          path: "/logout",
          element: <LogoutPage />,
        },
        {
          path: "/new-view",
          element: <ViewCreationPage />,
        },
      ],
    },
  ];

  const routesUnauthenticatedOnly = [
    {
      path: "/login",
      element: <LoginPage />,
    },
  ];

  const routesPublic = [
    {
      path: "/",
      element: <LandingPage />,
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
      path: "/invalid",
      element: <InvalidPage />,
    },
    {
      path: "/login",
      element: <NotFoundPage />,
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
      children: [
        // we use the ... operator to combine these arrays into one
        ...(!token ? routesUnauthenticatedOnly : []),
        ...routesPublic,
        ...routesHidden,
      ],
    },
  ]);

  // provide configuration using RouterProvider
  return router;
}

export default Routes;
