import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {

  const data = [
    { course: "BTech", count: 3 },
    { course: "MBA", count: 2 },
    { course: "MTech", count: 1 },
    { course: "MBBS", count: 1 }
  ];

  return (
    <div className="page">

      <h1>College Dashboard</h1>

      <div
        className="card"
        style={{
          height: "400px",
          marginTop: "20px"
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Dashboard;