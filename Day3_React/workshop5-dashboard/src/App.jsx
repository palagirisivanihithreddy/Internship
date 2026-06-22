import DeptBarChart from "./components/DeptBarChart";
import StatusPieChart from "./components/StatusPieChart";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Dashboard</h1>

      <DeptBarChart />

      <br />
      <br />

      <StatusPieChart />
    </div>
  );
}

export default App;