import { toPng } from "html-to-image";
import GeneratedView from "../components/GeneratedView";
import ReportCacheStatusCallout from "../components/ReportCacheStatusCallout";
import ViewCreationForm from "../components/ViewCreationForm";
import { useEffect, useState, useCallback, useRef } from "react";
import Button from "@/components/Button";
import { useAuth } from "../provider/AuthProvider";
import Icon from "@/components/Icons";
import type { IFormInputs, Ticket } from "@/types";
import api from "@/api";

import { useLocation } from "react-router-dom";

function ViewCreationPage() {
  const location = useLocation();
  const savedFilter = location.state?.filter;

  const [filter, setFilter] = useState(
    savedFilter ||
      ({
        layout: "chart",
        grouping: "building",
        building: [],
        diagnoses: [],
        requestor: [],
      } as IFormInputs),
  );

  const [filteredData, setFilteredData] = useState([] as Array<Ticket>);
  const { token } = useAuth();

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

  useEffect(() => {
    api.fetchFilteredTickets({ token, filter }).then((data: Array<Ticket>) => {
      setFilteredData(data);
    });
  }, [filter, token]);

  return (
    <>
      <h1>Create a new view</h1>
      {/* Generated View Display */}
      <div ref={ref}>
        <GeneratedView data={filteredData || []} filter={filter} />
      </div>
      <Button onClick={onSaveButtonClick}>
        Save Image
        <div className="place-self-center">
          <Icon icon="save" width={4} />
        </div>
      </Button>
      <ReportCacheStatusCallout />
      {/* View Creation Form */}
      <ViewCreationForm filter={filter} setFilter={setFilter} />
    </>
  );
}

export default ViewCreationPage;
