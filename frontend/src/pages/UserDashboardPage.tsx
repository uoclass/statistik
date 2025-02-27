/*
 * User Dashboard Page
 * by Alex JPS
 * 2024-05-02
 *
 * Defines the user dashboard page component,
 * a protected page which displays info upon login.
 */

function UserDashboardPage() {
  /* This component displays the landing page.
   */
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        This is the user dashboard, which should only be visible after login.
      </p>
    </div>
  );
}

export default UserDashboardPage;
