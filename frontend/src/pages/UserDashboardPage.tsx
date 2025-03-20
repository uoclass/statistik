/*
 * Defines the user dashboard page component,
 * a protected page which displays info upon login.
 */
import { useAuth } from "@/provider/AuthProvider";
import { useState, useEffect } from "react";
import { CollapsibleItem } from "@/components/CollapsibleItem";
import type { ConfigData, ViewConfigsResponse } from "@/types";

function UserDashboardPage() {
  const { token } = useAuth();
  const [fullName, setFullName] = useState("");
  const [savedViews, setSavedViews] = useState<ConfigData[]>([]);

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
        setSavedViews(resData.viewConfigs || []);
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
      <div className="mr-auto pt-8 pr-4">
        {savedViews?.length === 0 ? (
          <p className="text-[#888] italic pt-4">No previous views found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {savedViews?.map((item, index) => (
              <CollapsibleItem
                key={index}
                item={item}
                viewsState={{ savedViews, setSavedViews }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserDashboardPage;
