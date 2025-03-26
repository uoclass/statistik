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

const GeneratedView = ({
  filter,
  data,
}: {
  filter: IFormInputs;
  data: Array<Ticket>;
}) => {
  // get diagnosis count

  let diagnosisCount: Record<string, Ticket[]> = {};
  if (filter.grouping === "diagnoses") {
    diagnosisCount = data.reduce((acc, ticket) => {
      for (const diagnosis of ticket.diagnoses) {
        if (!acc[diagnosis.value]) {
          acc[diagnosis.value] = [];
        }
        acc[diagnosis.value].push(ticket);
      }
      return acc;
    }, diagnosisCount);
  }
  // form groupings and return category / bucket name
  let groupedData = Object.groupBy(data, (ticket: Ticket) => {
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
        return ticket.location;
    }
  });

  if (filter.grouping === "diagnoses") {
    groupedData = diagnosisCount;
  }
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
