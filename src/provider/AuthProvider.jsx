import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

// create empty context object to share authentication state between components
const AuthContext = createContext();

/* Component providing an authentication context.
 * The children prop represents components with access to the authentication context.
 */
const AuthProvider = ({children}) => {

    // retrieve token from local storage if exists
    const [token, setTokenState] = useState(localStorage.getItem("token"));

    /* Update the token value using the state setter function from the useState hook
     */
    const setToken = (newToken) => {
        setTokenState(newToken);
    }

    // set default auth header in axios & store token value in local storage
    // this runs when the token value changes
    useEffect(() => {
        if (token) {
            // token exists, set auth header in axios and localStorage
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token);
        } else {
            // token does not exist, remove auth header from axios and localStorage
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    }, [token]);

    // create memoized context value (saved across renders)
    const contextValue = useMemo(
        () => ({
        token,
        setToken}),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// export the custom useAuth hook to access authentication context in components
export const useAuth = () => {
    return useContext(AuthContext);
}

// export the AuthProvider component
export default AuthProvider;