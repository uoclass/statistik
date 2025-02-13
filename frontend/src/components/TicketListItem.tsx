
interface Ticket {
	id: number;
	ticket_id: string;
	title: string;
	assigned_to: string;
	requestor: string;
	email: string;
	department: string;
	location: string;
	room: string;
	created: Date;
	modified: Date;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	diagnoses: [];
}


const TicketListItem = ({ ...ticket }) => {
	return (
		<div className="bg-gray-100 rounded-lg p-4 shadow-md border" >
			{/* Title */}
			<h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>

			{/* Requestor */}
			<div className="mb-1">
				<span className="font-medium">👤</span>{" "}
				<a href={`mailto:${ticket.email}`} className="text-blue-600 hover:underline">
					{ticket.requestor}
				</a>
			</div>

			{/* Location */}
			<div className="mb-1">
				<span className="font-medium">🏢</span>{" "}
				<span>{ticket.location} {ticket.room}</span>
			</div>

			{/* Time Created */}
			<div className="mb-1">
				<span className="font-medium">⏰</span>{" "}
				<span>{ticket.created.toLocaleDateString("en-US", {year: "numeric", month: "short", day: "2-digit"})}</span>
			</div>

			{/* Diagnoses */}
			{ticket.diagnoses.length > 0 && (
				<div className="mb-4">
					<span className="font-medium">🏷️</span>{" "}
					<span>{ticket.diagnoses.map(d => d.value).join(", ")}</span>
				</div>
			)}

			{/* Buttons */}
			<div className="flex justify-between items-center">
				<button
					className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 text-sm"
					onClick={() => navigator.clipboard.writeText(ticket.title)}
				>
					📋 Copy
				</button>
				<button
					className="flex items-center gap-2 px-4 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
					onClick={() => window.open(ticket.webUrl, "_blank")}
				>
					🔗 Open in Web
				</button>
			</div>
		</div>
	);
};


export default TicketListItem;