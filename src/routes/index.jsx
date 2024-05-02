/*
 * Routes Index
 * by Alex JPS
 * 2024-04-26
 *
 * Defines routes for the app.
 */

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import IpsumPage from "../pages/IpsumPage";
import UserDashboardPage from "../pages/UserDashboardPage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";


const Routes = () => {
    const { token } = useAuth();

    // route configurations go here
    const routesPublic = [
        {
            path: "/landing",
            element: <LandingPage />
        }
    ];

    const routesAuthenticated = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <UserDashboardPage />
                },
                {
                    path: "/dashboard",
                    element: <UserDashboardPage />
                },
                {
                    path: "/logout",
                    element: <LogoutPage />
                }
            ]
        }
    ];

    const routesUnauthenticated = [
        {
            path: "/",
            element: <LandingPage />
        },
        {
            path: "/login",
            element: <LoginPage />
        },
        {
            path: "/about",
            element: <AboutPage />
        },
        {
            path: "/ipsum",
            element: <IpsumPage />
        }
    ];

    // decide which routes are available to user based on authentication status
    const router = createBrowserRouter([
        // we use the ... operator to combine these arrays into one
        ...routesPublic,
        ...(!token ? routesUnauthenticated : []),
        ...routesAuthenticated
    ]);

    // provide configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;
