import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="Nav">
      <ul className="Nav-list">
        <li>
          <NavLink to="/dashboard">dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/new-view">new view</NavLink>
        </li>
        <li>
          <NavLink to="/database">database</NavLink>
        </li>
        <li>
          <NavLink to="/settings">settings</NavLink>
        </li>
        <li>
          <NavLink to="/user-guide">user guide</NavLink>
        </li>
        <li>
          <NavLink to="/about">about</NavLink>
        </li>
        <li>
          <NavLink to="/login">sign in</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
