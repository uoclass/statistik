function Nav() {
  /*
   * This component defines the Navbar format.
   */

  return (
    <div className="Nav">
      <ul className="Nav-list">
        <li>
          <a href="/dashboard">dashboard</a>
        </li>
        <li>
          <a href="/new-view">new view</a>
        </li>
        <li>
          <a href="/database">database</a>
        </li>
        <li>
          <a href="/settings">settings</a>
        </li>
        <li>
          <a href="/user-guide">user guide</a>
        </li>
        <li>
          <a href="/about">about</a>
        </li>
        <li>
          <a href="/login">sign in</a>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
