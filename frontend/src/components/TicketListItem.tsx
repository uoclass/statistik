
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

const TicketListItem = ({...ticket}: Ticket) => {
	return <div className="bg-light-gray rounded-3 p-4">
		<p>{ticket.title}</p>
		<p>{ticket.assigned_to}</p>
		<a href={"mailto:" + ticket.email}>{ticket.requestor}</a>
		<p>{ticket.location} {ticket.room}</p>
		<p>{ticket.created.toString()}</p>
		<p>{ticket.status}</p>
		<p>{ticket.diagnoses.map(d => d.value).join(", ")}</p>
	</div>
}

export default TicketListItem;