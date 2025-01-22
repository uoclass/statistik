import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import "./Callout.css";

function formatUnixTime(unixTime) {
  const date = new Date(unixTime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } satisfies Intl.DateTimeFormatOptions;
  return date.toLocaleString("en-US", options);
}

function ReportCacheStatusCallout() {
  const token = useAuth();
  const [reportCacheGenTime, setReportCacheGenTime] = useState(null);
  const [refreshed, setRefreshedState] = useState(false);

  const refresh = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/refresh-report`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRefreshedState(true);
  };

  // set up calling API to get time of report cache generation
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tickets/report-cache-generation-time`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        setReportCacheGenTime(null);
      } else {
        const result = await response.json(); // Parse the JSON
        setReportCacheGenTime(result.timestamp);
      }
    };
    fetchData();
  }, [token, refreshed]);

  return (
    <>
      <div className="grey-callout-box" id="report-cache-gen-time-box">
        {reportCacheGenTime ? (
          <p>Using ticket data as of {reportCacheGenTime}</p>
        ) : (
          <p>
            Using ticket data as of <span className={"loading-text-box"} />
          </p>
        )}
        <button className={"callout-button"} onClick={refresh}>
          Refresh
        </button>
      </div>
    </>
  );
}

export default ReportCacheStatusCallout;
