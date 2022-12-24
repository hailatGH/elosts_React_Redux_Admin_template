import { PieChart, Pie, Cell } from "recharts";
// Cusotm hook import
import { useSidebarState } from "../../../../contexts/UIContexts";

const data = [
  { name: "Group A", value: 700 },
  { name: "Group B", value: 220 },
  { name: "Group C", value: 80 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function App() {
  const sidebar = useSidebarState();

  return (
    <PieChart width={400} height={370}>
      <Pie
        data={data}
        cx={sidebar ? 187 : 210}
        cy={180}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={180}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
