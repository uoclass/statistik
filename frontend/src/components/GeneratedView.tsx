import { IFormInputs } from "@/components/ViewCreationForm";
import { Ticket } from "@/pages/ViewCreationPage";
import { YAxis, XAxis, Bar, BarChart, LabelList } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { getWeekBucket } from "@/lib/viewUtils";

const GeneratedView = ({
  filter,
  data,
}: {
  filter: IFormInputs;
  data: Array<Ticket>;
}) => {
  // form groupings and return category / bucket name
  const groupedData = Object.groupBy(data, (ticket: Ticket) => {
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
      default:
        return ticket.location;
    }
  });

  // translate into chartable format
  const translateData = (data: Partial<Record<string, Ticket[]>>) => {
    return Object.entries(data).map(([groupName, tickets]) => {
      if (groupName === "") {
        groupName = "Unspecified Building";
      }

      return {
        grouping: filter?.grouping || "none",
        name: groupName,
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
    <ChartContainer
      config={chartConfig}
      className="min-h-[600px] w-full place-self-center"
    >
      <BarChart accessibilityLayer data={chartData || []} layout="vertical">
        <XAxis type="number" dataKey="quantity" hide />
        <YAxis
          type="category"
          dataKey="name"
          textAnchor="end"
          tickLine={false}
          axisLine={false}
          width={200}
        />
        <Bar dataKey="quantity" fill="#FF0000" radius={1}>
          <LabelList
            dataKey="quantity"
            position="right"
            offset={8}
            className="fill-black"
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
export default GeneratedView;
