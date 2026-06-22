import DashboardCard from "../components/DashboardCard";
import employees from "../data/employees";

function Dashboard() {

  const totalEmployees = employees.length;

  const departments =
    [...new Set(employees.map(emp => emp.department))]
      .length;

  const activeEmployees =
    employees.filter(
      emp => emp.status === "Active"
    ).length;

  const leaveEmployees =
    employees.filter(
      emp => emp.status === "Leave"
    ).length;

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Employee Management Dashboard
      </h1>

      <div className="dashboard-grid">

        <DashboardCard
          title="Total Employees"
          value={totalEmployees}
          icon="👥"
        />

        <DashboardCard
          title="Departments"
          value={departments}
          icon="🏢"
        />

        <DashboardCard
          title="Active Employees"
          value={activeEmployees}
          icon="✅"
        />

        <DashboardCard
          title="On Leave"
          value={leaveEmployees}
          icon="🌴"
        />

      </div>

    </div>
  );
}

export default Dashboard;