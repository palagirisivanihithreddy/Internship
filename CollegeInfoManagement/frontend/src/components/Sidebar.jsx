import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Colleges", path: "/colleges", icon: "🏫" },
  ];

  return (
    <div className="sidebar">
      <div className="logo-section">
        <h1>🎓 CollegeHub</h1>
        <p>Management System</p>
      </div>

      <div className="menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "menu-item active"
                : "menu-item"
            }
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>

      <button className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;