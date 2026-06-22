import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { useDashboard }
from "../context/DashboardContext";

function DeptBarChart() {

  const { byDept } = useDashboard();

  return (
    <BarChart
      width={500}
      height={300}
      data={byDept}
    >
      <XAxis dataKey="department" />
      <YAxis />
      <Tooltip />
      <Bar
        dataKey="count"
        fill="#8884d8"
      />
    </BarChart>
  );
}

export default DeptBarChart;