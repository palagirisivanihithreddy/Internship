import {
  PieChart,
  Pie,
  Tooltip
} from "recharts";

function StatusPieChart() {

  const data = [
    { name: "Engineering", value: 2 },
    { name: "HR", value: 1 },
    { name: "Sales", value: 1 }
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      />
      <Tooltip />
    </PieChart>
  );
}

export default StatusPieChart;