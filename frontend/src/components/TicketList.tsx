import Icon from "./Icons";
import type { Ticket } from "@/types";

const TicketListItem = ({ ...ticket }: Ticket) => {
  return (
    <div className="text-base bg-neutral-100 p-4">
      {/* Title */}
      <h2 className="text-2xl! font-semibold mb-2">{ticket.title}</h2>

      {/* Requestor */}
      <div className="mb-1 flex items-center">
        <Icon width={24} className="mr-2" icon="user" />
        <a
          href={`mailto:${ticket.email}`}
          className="text-blue-600 hover:underline"
        >
          {ticket.requestor}
        </a>
      </div>

      {/* Location */}
      <div className="mb-1 flex items-center">
        <Icon width={24} className="mr-2" icon="location" />
        <span>
          {ticket.location} {ticket.room}
        </span>
      </div>

      {/* Time Created */}
      <div className="mb-1 flex items-center">
        <Icon width={24} className="mr-2" icon="time" />
        <span>
          {ticket.created.toLocaleDateString("en-US", {
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
          className="px-3 flex items-center py-1 text-neutral-400 hover:text-neutral-500"
          onClick={() => navigator.clipboard.writeText(ticket.title)}
        >
          <Icon width={20} className="mr-2" icon="copy" />
          <span className="text-base">Copy ticket info</span>
        </button>

        <span className="flex items-center">
          {/* Copy link button */}
          <button className="flex items-center gap-2 px-2 mx-0 py-1 bg-neutral-200 text-neutral-400 hover:bg-neutral-300 hover:text-neutral-500 text-sm">
            <Icon width={24} className="mr-2" icon="link" />
          </button>

          {/* Open in TeamDynamix button */}
          <button
            className="flex items-center gap-2 px-4 mx-0 py-1 bg-neutral-700 text-white hover:bg-neutral-600 text-sm"
            onClick={() => window.open(ticket.webUrl, "_blank")}
          >
            Open in TeamDynamix
            <Icon width={24} className="mr-2" color="white" icon="open" />
          </button>
        </span>
      </div>
    </div>
  );
};

const TicketListCollapsibleSection = ({ group_name, ticket_data }) => {
  return (
    <div className="bg-neutral-100 p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

export default TicketListItem;
