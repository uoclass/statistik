/*
 * React App Component
 * by Alex JPS, Eric Edwards
 * 2024-03-06
 *
 * Defines the App component and its routing.
 */

// Packages
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

// Routing
import AuthProvider from "./provider/AuthProvider";
import Routes from "./routes/Routes";

function App() {
  /* This component serves as the root of the app.
   */
  useEffect(() => {
    document.body.classList.add("white-background");
  }, []);
  const router = Routes();
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
