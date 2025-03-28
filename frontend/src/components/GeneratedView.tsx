import { Ticket, IFormInputs } from "@/types";
import { YAxis, XAxis, Bar, BarChart, LabelList } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getWeekBucket } from "@/lib/viewUtils";
import TicketList from "./TicketList";

/* Organize ticket data into groups based on selected grouping in filter
 * This is needed for getting counts per group (chart view) and for getting the groupings themselves (list view)
 * Output is something like {"group name": [ticket1, ticket2, ...], "group name2": [ticket3, ticket4, ...], etc.}
 */
const organizeIntoGroups = (data: Array<Ticket>, filter: IFormInputs) => {
  console.log("The requested grouping is ", filter.grouping);
  if (filter.grouping === "diagnoses") {
    // group by diagnoses (works a bit differently because a ticket can have multiple)
    let diagnosesCount: Record<string, Ticket[]> = {};
    if (filter.grouping === "diagnoses") {
      diagnosesCount = data.reduce((acc, ticket) => {
        for (const diagnosis of ticket.diagnoses) {
          if (!acc[diagnosis.value]) {
            acc[diagnosis.value] = [];
          }
          acc[diagnosis.value].push(ticket);
        }
        return acc;
      }, diagnosesCount);
    }
    return diagnosesCount;
  } else if (filter.layout === "list" && filter.grouping === "none") {
    // group by none (i.e. return all tickets in a single group, only allowed for list)
    return {"All Tickets": data}; // return all tickets in a single group
  } else {
    // group by other groupings (those which only have one value per ticket)
    return Object.groupBy(data, (ticket: Ticket) => {
      switch (filter.grouping) {
        case "week":
          return getWeekBucket(
            new Date(ticket.created!),
            new Date(filter.termStart!),
          );
        case "building":
          return ticket.location;
        case "requestor":
          return ticket.requestor;
        case "room":
          return `${ticket.location || "Unspecified Building"} ${ticket.room}`;
        default:
          // handles case where layout is "chart" but somehow grouping is "none" (not allowed)
          return ticket.location;
      }
    });
  }
};

const GeneratedView = ({
  filter,
  data
} : {
  filter: IFormInputs;
  data: Array<Ticket>;
}) => {
  if (filter.layout === "chart") {
    return <ChartView filter={filter} data={data} />;
  } else if (filter.layout === "list") {
    const groupedData = organizeIntoGroups(data, filter);
    return <TicketList grouped_ticket_data={groupedData as Record<string, Array<Ticket>>} />;
  } else {
    return (
      <div>
        <h1>Invalid Layout</h1>
      </div>
    );
  }
};

const ChartView = ({
  filter,
  data,
}: {
  filter: IFormInputs;
  data: Array<Ticket>;
}) => {
  // form groupings
  let groupedData = organizeIntoGroups(data, filter);
  
  // translate into chartable format
  const translateData = (data: Partial<Record<string, Ticket[]>>) => {
    return Object.entries(data).map(([groupName, tickets]) => {
      if (!groupName || groupName === "") {
        groupName = "Unspecified";
      }

      return {
        grouping: filter.grouping || "none",
        name: groupName,
        tickets: tickets,
        quantity: tickets?.length,
      };
    });
  };

  let chartData = translateData(groupedData); // execute translation
  chartData = chartData.slice(0, 20); // visuals begin to break > 20 items

  // sort groupings
  if (filter.grouping !== "week") {
    // sort items descending by quantity in bucket
    chartData.sort((first, second) => second.quantity! - first.quantity!);
  }

  const chartConfig = {
    tickets: {
      label: "Tickets",
      color: "#1f77b4",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardTitle>Generated View</CardTitle>
      <CardDescription className="black">
        Ticket
        {filter?.grouping !== "none" ? ` quantity by ${filter.grouping}` : "s"}
      </CardDescription>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[600px] w-full place-self-start"
        >
          <BarChart
            accessibilityLayer
            data={chartData || []}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <XAxis type="number" dataKey="quantity" hide />
            <YAxis
              type="category"
              dataKey="name"
              textAnchor="end"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={150}
            />
            <Bar dataKey="quantity" fill="#e00000" radius={0}>
              <LabelList
                dataKey="quantity"
                position="right"
                offset={6}
                className="fill-black"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>Generated on Statistik</CardFooter>
    </Card>
  );
};

export default GeneratedView;
