import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">

      <div className="logo">
        ACTORYX
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/employees">Employees</Link>
      </div>

      <button className="logout-btn">
        Logout
      </button>

    </div>
  );
}

export default Navbar;