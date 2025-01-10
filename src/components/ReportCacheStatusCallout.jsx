import {useAuth} from "../provider/AuthProvider";
import {React, useEffect, useState} from "react";
import "./Callout.css"

function formatUnixTime(unixTime) {
	const date = new Date(unixTime);
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	};
	return date.toLocaleString('en-US', options);
}

function ReportCacheStatusCallout() {
	const {token} = useAuth();
	const [reportCacheGenTime, setReportCacheGenTime] = useState(null);

	// set up calling API to get time of report cache generation
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tickets/report-cache-generation-time`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				}
			});
			if (!response.ok) {
				setReportCacheGenTime("Unknown")
			}
			const result = await response.json(); // Parse the JSON
			setReportCacheGenTime(result.date);
		}
		fetchData();
	}, []);

	return (
		<>
			<div class="grey-callout-box" id="report-cache-gen-time-box">
				{reportCacheGenTime ? (
					<p>Using ticket data as of {formatUnixTime(reportCacheGenTime)}</p>
				) : (
					<p>Using ticket data as of <span className={"loading-text-box"} /></p>
				)}
				<button className={"callout-button"}>Refresh</button>
			</div>
		</>
	);
}

export default ReportCacheStatusCallout;