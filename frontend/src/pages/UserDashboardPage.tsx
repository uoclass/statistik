/*
 * Defines the user dashboard page component,
 * a protected page which displays info upon login.
 */
import { IFormInputs } from "@/components/ViewCreationForm";
import { useAuth } from "@/provider/AuthProvider";
import { useState, useEffect } from "react";

interface ViewConfigsResponse {
  name: string;
  viewConfigs: Array<IFormInputs>;
}

function UserDashboardPage() {
  const { token } = useAuth();
  const [fullName, setFullName] = useState("");
  const [savedViews, setSavedViews] = useState<IFormInputs[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/view-configs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((resData: ViewConfigsResponse) => {
        console.log(resData.viewConfigs);
        setSavedViews(resData.viewConfigs);
        setFullName(resData.name);
      });
  }, [token]);

  return (
    <>
      <h1>Dashboard</h1>
      <h3>
        Welcome,{" "}
        <span className="text-red-500">
          {fullName || <div className="loading-text max-w-40" />}
        </span>
      </h3>
      <div>
        {savedViews.map((viewFilter, i) => {
          return <div key={i}>{JSON.stringify(viewFilter)}</div>;
        })}
      </div>
    </>
  );
}

export default UserDashboardPage;
