import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import "./Callout.css";

function formatUnixTime(unixTime: number) {
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
  const [reportCacheGenTime, setReportCacheGenTime] = useState("");

  const refreshReport = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/refresh-report`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setReportCacheGenTime("");
    });
  };

  useEffect(() => {
    async function fetchRefreshTime() {
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

      const result = await response.json();
      console.log(result.timestamp);
      return formatUnixTime(result.timestamp);
    }

    fetchRefreshTime().then((timestamp) => {
      setReportCacheGenTime(timestamp ? timestamp : "");
    });
  }, [token, reportCacheGenTime]);

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
        <button className={"callout-button"} onClick={refreshReport}>
          Refresh
        </button>
      </div>
    </>
  );
}

export default ReportCacheStatusCallout;
