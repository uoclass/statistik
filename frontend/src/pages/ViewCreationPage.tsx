// import GeneratedView from "../components/GeneratedView";
import ReportCacheStatusCallout from "../components/ReportCacheStatusCallout";
import ViewCreationForm from "../components/ViewCreationForm";
import { useEffect, useState } from "react";
import { IFormInputs } from "../components/ViewCreationForm";
import { useAuth } from "../provider/AuthProvider";

// A layout defines a set of parameters
function ViewCreationPage() {
  const [filter, setFilter] = useState({
    grouping: "none",
    layout: "chart",
  } as IFormInputs);

  const { token } = useAuth();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/tickets/fetch-filtered-tickets`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filter: filter }),
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [token, filter]);

  return (
    // <GeneratedView config={config} data={data} />
    <>
      <h3>Create a new view</h3>
      <ReportCacheStatusCallout />
      <ViewCreationForm setFilter={setFilter} />
    </>
  );
}

export default ViewCreationPage;
