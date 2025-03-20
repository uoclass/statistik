/*
 * Login Page
 * by Alex João Peterson Santos and Eric Edwards
 * 2024-05-02
 *
 * Defines the login page component,
 * A page only visible to unauthenticated users.
 */

// Packages
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* This component displays the login page.
 */
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { token, setToken, setUsername } = useAuth();
  const navigate = useNavigate();

  if (token) {
    // kick users who are already authenticated
    return <Navigate to={"/dashboard"} />;
  }

  const onButtonClick = () => {
    // don't immediately reload the page
    // event.preventDefault();

    // set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // make sure that fields were correctly filled out
    if (email === "") {
      setEmailError("Please enter your email address");
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (password === "") {
      setPasswordError("Please enter your password");
    }

    // make calls to verify authentication here
    // NOTE could add an api endpoint and check here for whether an account exists

    handleLogin();
    console.log("Reached the end of the onButtonClick function");
  };

  const validateToken = async (token: string) => {
    console.log(
      `Sending token validation request to ${import.meta.env.VITE_API_URL}/api/auth/verify`,
    );
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        },
      );
      const data = await response.json();
      if (data.message === "valid token") {
        console.log("Token is valid");
        return true;
      }
    } catch (error) {
      console.error("Could not validate token: ", error);
      return false;
    }
  };

  const handleLogin = () => {
    console.log(
      `Sending login request to ${import.meta.env.VITE_API_URL}/api/auth/login`,
    );
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Successful login.");
        } else {
          window.alert("Login failed.");
        }
        return response.json();
      })
      .then((data) => {
        // the login was successful
        if (!data.error) {
          setToken(data.token);
          setUsername(email);
          setTimeout(() => {
            navigate("/dashboard");
          }, 500);
        }
      })
      .catch((error) => {
        console.error("Could not login: ", error);
        window.alert("An error occurred while trying to login.");
      });
  };

  return (
    <>
      <div className="titleContainer">
        <div>Sign in</div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          value={email}
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label className="error-label">{emailError}</Label>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label className="error-label">{passwordError}</Label>
      </div>
      <Button type="button" onClick={onButtonClick}>
        Sign in
      </Button>
    </>
  );
}

export default LoginPage;
