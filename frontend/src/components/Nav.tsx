import { NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import "./Nav.css";

function Nav() {
  const { token } = useAuth();

  return (
    <nav className="Nav">
      <ul className="Nav-list">
        <li>
          <NavLink to="/dashboard" state={{ filter: null }}>
            dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/new-view" state={{ filter: null }}>
            new view
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-guide">user guide</NavLink>
        </li>
        <li>
          <NavLink to="/about">about</NavLink>
        </li>
        <li>
          {!token ? (
            <NavLink to="/login">sign in</NavLink>
          ) : (
            <NavLink to="/logout">sign out</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
