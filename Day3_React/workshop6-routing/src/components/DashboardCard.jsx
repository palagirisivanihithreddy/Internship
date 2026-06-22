function DashboardCard({ title, value, icon }) {
  return (
    <div className="dashboard-card">

      <div className="card-icon">
        {icon}
      </div>

      <h2>{value}</h2>

      <p>{title}</p>

    </div>
  );
}

export default DashboardCard;