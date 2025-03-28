import Icon from "./Icons";
import type { Ticket } from "@/types";
import { TicketListItem, get_ticket_info_string } from "./TicketListItem";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";


/* TicketListSection component
 * This component is used to display a list of tickets grouped into a single category.
 * The expectation is that all ticket objects in ticket_data are of the group in group_name.
*/
const TicketListSection = (
  {
    group_name,
    ticket_data
  }: {
    group_name: string;
    ticket_data: Array<Ticket>;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div className={`${(isOpen) ? "pb-2" : "pb-0"} mb-4 bg-neutral-100 px-4`}>
      <button className="flex flex-row justify-between w-full text-lg font-semibold mb-2 pt-3 pb-2" onClick={toggleOpen}>
        <h3>
          {(!group_name) ? "Unspecified Group" : group_name} 
          <span className="text-neutral-500"> ({ticket_data.length})</span>
        </h3>
        {isOpen ? <ChevronUp size={36} /> : <ChevronDown size={36} />}
      </button>
      {!isOpen ? null : <>
        <button
          className="px-3 flex items-center py-1 text-neutral-500 hover:text-neutral-600"
          onClick={() => {
            let to_clipboard = `${ticket_data.length} tickets matching given filters in section "${group_name}"`;
            for (let i = 0; i < ticket_data.length; i++) {
              to_clipboard += "\n-----\n";
              to_clipboard += get_ticket_info_string(ticket_data[i]);
            }
            navigator.clipboard.writeText(to_clipboard);
          }}
        >
          <Icon width={20} className="mr-2" icon="copy" />
          <span className="text-base">Copy all tickets in this section</span>
        </button>
        {ticket_data.map((ticket: Ticket, index: number) => {
        return <TicketListItem key={index} ticket={ticket} />})}
        </>
        }
    </div>
  );
}

/* ticket_data should be grouped ticket data
 * i.e. output of organizeIntoGroups from GeneratedView.tsx
 * This will not work if the ticket data is not grouped
 */
const TicketList = ({grouped_ticket_data}: {grouped_ticket_data: Record<string, Array<Ticket>>}) => {
  return Object.entries(grouped_ticket_data).map(([group_name, ticket_data]) => (
    <TicketListSection
      key={group_name}
      group_name={group_name}
      ticket_data={ticket_data}
    />
  ))
}


export default TicketList;
