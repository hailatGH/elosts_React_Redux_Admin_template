import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Cusotm hook import
import { useSidebarState } from "../../../../../contexts/UIContexts";

// import dummy data
import { weekData, monthData, yearData } from "./userDummyData";

export default function UserSummayChart(props) {
  const sidebar = useSidebarState();

  let data = [];
  if (props.status === "weekly") data = weekData;
  if (props.status === "monthly") data = monthData;
  if (props.status === "yearly") data = yearData;

  return (
    <BarChart
      width={sidebar ? 600 : 700}
      height={450}
      data={data}
      margin={{
        top: 0,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width={40} />
      <Tooltip />
      <Legend />
      <Bar dataKey="NewUsers" fill="#8884d8" />
      <Bar dataKey="NewSubscription" fill="#82ca9d" />
    </BarChart>
  );
}
