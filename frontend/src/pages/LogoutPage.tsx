/*
 * Logout Page
 *
 * Defines the logout page, which just
 * removes the user's token and redirects them.
 */

// Packages
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useEffect } from "react";

function LogoutPage() {
  /* This component displays the logout page.
   */
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      setToken("");
      navigate("/", { replace: true });
      console.log("Logged out.");
    };

    if (!token) {
      // kick users who are not authenticated
      navigate("/invalid", { replace: true });
      return;
    }

    const logoutTimer = setTimeout(handleLogout, 3000);

    return () => clearTimeout(logoutTimer);
  }, []);

  return (
    <div>
      <h1>Logout Page</h1>
      <p>
        Logging out...
      </p>
    </div>
  );
}

export default LogoutPage;
