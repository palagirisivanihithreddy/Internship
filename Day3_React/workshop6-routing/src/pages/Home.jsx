function Home() {
  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Welcome to Employee Management System
      </h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <h2>150</h2>
          <p>Total Employees</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🏢</div>
          <h2>10</h2>
          <p>Departments</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📈</div>
          <h2>95%</h2>
          <p>Attendance</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💰</div>
          <h2>₹12.5L</h2>
          <p>Monthly Payroll</p>
        </div>

      </div>

    </div>
  );
}

export default Home;