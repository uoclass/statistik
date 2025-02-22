import GeneratedView from "../components/GeneratedView";
import ReportCacheStatusCallout from "../components/ReportCacheStatusCallout";
import ViewCreationForm from "../components/ViewCreationForm";
import { useEffect, useState } from "react";
import { IFormInputs } from "../components/ViewCreationForm";
import { useAuth } from "../provider/AuthProvider";

export interface Ticket {
  id: number;
  ticket_id: string;
  title: string;
  assigned_to: string;
  requestor: string;
  email: string;
  department: string;
  location: string;
  room: string;
  created: string;
  modified: string;
  status: "Open" | "Closed";
  createdAt: Date;
  updatedAt: Date;
  diagnoses: [];
}

function ViewCreationPage() {
  const [filter, setFilter] = useState({
    layout: "chart",
    grouping: "building",
    building: [],
    diagnoses: [],
    requestor: [],
  } as IFormInputs);

  const [filteredData, setFilteredData] = useState([] as Array<Ticket>);

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
      .then((data: Array<Ticket>) => {
        setFilteredData(data);

        // ticket array
        console.log(data);
      });
  }, [token, filter]);

  return (
    <>
      <h3>Create a new view</h3>
      <GeneratedView data={filteredData} filter={filter} />
      <ReportCacheStatusCallout />
      <ViewCreationForm setFilter={setFilter} />
    </>
  );
}

export default ViewCreationPage;
