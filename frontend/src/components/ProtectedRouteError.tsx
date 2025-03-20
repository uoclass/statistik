const ProtectedRouteError = () => {
  return (
    <div id="error">
      <h2>Application Error</h2>
      <p>
        The application ran into an issue. This is likely due to an expired user
        session. Please sign in again!
      </p>
    </div>
  );
};

export default ProtectedRouteError;
