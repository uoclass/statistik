import { toPng } from "html-to-image";
import GeneratedView from "../components/GeneratedView";
import ReportCacheStatusCallout from "../components/ReportCacheStatusCallout";
import ViewCreationForm from "../components/ViewCreationForm";
import { useEffect, useState, useCallback, useRef } from "react";
import { IFormInputs } from "../components/ViewCreationForm";
import Button from "@/components/Button";
import { useAuth } from "../provider/AuthProvider";
import Icon from "@/components/Icons";

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
  const { token, username } = useAuth();

  // chart ref for image saving
  const ref = useRef<HTMLDivElement>(null);

  // save image handler
  const onSaveButtonClick = useCallback(() => {
    if (ref.current === null) return;

    toPng(ref.current!, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "statistik-chart.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const fetchTicketData = useCallback(() => {
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
        console.log(data);
        setFilteredData(data);
      });
  }, [token, filter]);

  useEffect(() => {
    fetchTicketData();
  }, [fetchTicketData]);

  return (
    <>
      <h1>Create a new view</h1>
      <div ref={ref}>
        <GeneratedView data={filteredData} filter={filter} />
      </div>
      <Button onClick={onSaveButtonClick}>
        Save Image
        <div className="place-self-center">
          <Icon icon="save" width={4} />
        </div>
      </Button>
      <ReportCacheStatusCallout />
      <ViewCreationForm setFilter={setFilter} />
    </>
  );
}

export default ViewCreationPage;
