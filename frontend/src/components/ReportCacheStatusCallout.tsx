import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import Button from "./Button";
import "./Callout.css";
import Icon from "@/components/Icons";
import api from "@/api";

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
  const { token } = useAuth();
  const [reportCacheGenTime, setReportCacheGenTime] = useState("");
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);

  const refreshReport = async () => {
    setIsRefreshLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/refresh-report`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setReportCacheGenTime("");
      setIsRefreshLoading(false);
    });
  };

  useEffect(() => {
    // Fetch report generation time
    api.getReportGenerationTime(token).then((data) => {
      const timestamp = formatUnixTime(data.timestamp);
      setReportCacheGenTime(timestamp || "");
    });
  }, [token, reportCacheGenTime]);

  return (
    <>
      <div className="grey-callout-box" id="report-cache-gen-time-box">
        {reportCacheGenTime ? (
          <p>
            Using ticket data as of <strong>{reportCacheGenTime}</strong>
          </p>
        ) : (
          <p>
            Using ticket data as of <span className="loading-text-box" />
          </p>
        )}

        <Button onClick={refreshReport} disabled={isRefreshLoading}>
          {!isRefreshLoading && "Refresh"}
          {isRefreshLoading && (
            <>
              Refreshing
              <div className="h-4 w-4 place-self-center animate-spin">
                <Icon icon="spinner" width={4} />
              </div>
            </>
          )}
        </Button>
      </div>
    </>
  );
}

export default ReportCacheStatusCallout;
