import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthContextProps, AuthProviderChildren } from "@/types";

// create empty context object to share authentication state between components
const AuthContext = createContext({} as AuthContextProps);

/* Component providing an authentication context. */
const AuthProvider = ({ children }: AuthProviderChildren) => {
  // retrieve token from local storage if exists
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  /* Update the token value using the state setter function from the useState hook
   */
  const setToken = (newToken: string) => {
    setTokenState(newToken);
  };

  // set default auth header in axios & store token value in local storage
  // this runs when the token value changes
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("username", username || "");
      localStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("username");
      localStorage.removeItem("token");
    }
  }, [token, username]);

  // create memoized context value (saved across renders)
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      username,
      setUsername,
    }),
    [token, username],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// export the custom useAuth hook to access authentication context in components
export const useAuth = () => {
  return useContext(AuthContext);
};

// export the AuthProvider component
export default AuthProvider;
