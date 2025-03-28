import Icon from "./Icons";
import type { Ticket } from "@/types";

const ticket_url_start = "https://service.uoregon.edu/TDNext/Apps/430/Tickets/TicketDet.aspx?TicketID=";

const get_ticket_info_string = (ticket: Ticket) => {
  return `${ticket.title}\nTicket ID:${ticket.ticket_id}\nRequestor: ${ticket.requestor}\nLocation: ${ticket.location} ${ticket.room}\nCreated: ${new Date(ticket.created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })}\nDiagnoses: ${(ticket.diagnoses.length ? ticket.diagnoses.map((d) => d.value).join(", ") : "None")}\nURL: ${ticket_url_start}${ticket.ticket_id}`;  
}

const TicketListItem = ({ticket}: {ticket: Ticket}) => {
  return (
    <div className="my-3 text-base bg-neutral-200 p-4">
      {/* Title */}
      <h2 className="text-2xl! font-semibold mb-2">{ticket.title}</h2>

      {/* Requestor */}
      {ticket.requestor && (
        <div className="mb-1 flex items-center">
          <Icon width={24} className="mr-2" icon="user" />
          <a
            href={`mailto:${ticket.email}`}
            className="text-blue-600 hover:underline"
          >
            {ticket.requestor}
          </a>
        </div>)
      }

      {/* Location */}
      {ticket.location && (
        <div className="mb-1 flex items-center">
          <Icon width={24} className="mr-2" icon="location" />
          <span>
            {ticket.location} {ticket.room}
          </span>
        </div>)
      }

      {/* Time Created */}
      <div className="mb-1 flex items-center">
        <Icon width={24} className="mr-2" icon="time" />
        <span>
          {new Date(ticket.created).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </span>
      </div>

      {/* Diagnoses */}
      {ticket.diagnoses.length > 0 && (
        <div className="mb-1 flex items-center">
          <Icon width={24} className="mr-2" icon="diagnoses" />
          <span>{ticket.diagnoses.map((d) => d.value).join(", ")}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-1 flex justify-between items-center">
        {/* Copy ticket info button */}
        <button
          className="px-3 flex items-center py-1 text-neutral-500 hover:text-neutral-600"
          onClick={() => navigator.clipboard.writeText(get_ticket_info_string(ticket))}
        >
          <Icon width={20} className="mr-2" icon="copy" />
          <span className="text-base">Copy ticket info</span>
        </button>

        <span className="flex items-center">
          {/* Copy link button */}
          <button
            className="flex items-center gap-2 px-2 mx-0 py-1 bg-neutral-300 text-neutral-500 hover:bg-neutral-300 hover:text-neutral-600 text-sm"
            onClick={() => navigator.clipboard.writeText(`${ticket_url_start}${ticket.ticket_id}`)}
          >
            <Icon width={24} className="mr-2" icon="link" />
          </button>

          {/* Open in TeamDynamix button */}
          <button
            className="flex items-center gap-2 px-4 mx-0 py-1 bg-neutral-700 text-white hover:bg-neutral-600 text-sm"
            onClick={() => window.open(`${ticket_url_start}${ticket.ticket_id}`, "_blank")}
          >
            Open in TeamDynamix
            <Icon width={24} className="mr-2" color="white" icon="open" />
          </button>
        </span>
      </div>
    </div>
  );
};

export {TicketListItem, get_ticket_info_string};
