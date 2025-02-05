/*
 * Logout Page
 * by Alex JPS
 * 2024-05-02
 *
 * Defines the logout page, which just
 * removes the user's token and redirects them.
 */

// Packages
import {Navigate, useNavigate} from "react-router-dom";

// Styles

import {useAuth} from "../provider/AuthProvider";
import {useEffect} from "react";

function LogoutPage() {
	/* This component displays the logout page.
	 */
	const { token, setToken} = useAuth();
	const navigate = useNavigate();

    if (!token) {
		// kick users who are not authenticated
		return <Navigate to={"/invalid"} />;
    }

	useEffect(() => {
		const handleLogout = () => {
			setToken("");
			navigate("/");
		}

		if (token) {
			setTimeout(() => {
				handleLogout();
			}, 3000);
		}
	}, [])

	return (
		<div>
			<h1>Logout Page</h1>
			<p>
				This is the logout page, which should only be visible to authenticated
				users and immediately redirects them to the landing page.
			</p>
		</div>
	);
}

export default LogoutPage;
