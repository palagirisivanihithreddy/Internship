import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06132f",
        color: "white",
        padding: "30px"
      }}
    >
      <h1>🎓 College Management Admin Panel</h1>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >
        <Link
          to="/admin/colleges"
          style={card}
        >
          🏫 Colleges Management
        </Link>

        <Link
          to="/admin/departments"
          style={card}
        >
          🏢 Departments Management
        </Link>

        <Link
          to="/admin/students"
          style={card}
        >
          🎓 Students Management
        </Link>

        <Link
          to="/admin/faculties"
          style={card}
        >
          👨‍🏫 Faculties Management
        </Link>

        <Link
          to="/admin/placements"
          style={card}
        >
          💼 Placements Management
        </Link>
      </div>
    </div>
  );
}

const card = {
  background: "#10244d",
  color: "white",
  textDecoration: "none",
  padding: "40px",
  borderRadius: "15px",
  textAlign: "center",
  fontSize: "22px",
  fontWeight: "bold"
};

export default AdminDashboard;