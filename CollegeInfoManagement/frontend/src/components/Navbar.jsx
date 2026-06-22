function Navbar() {
  return (
    <div className="navbar">
      <div>
        <h2>
          College Information Management
        </h2>

        <p>
          Professional Admin Dashboard
        </p>
      </div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search colleges..."
          className="search-box"
        />

        <div className="profile-circle">
          N
        </div>
      </div>
    </div>
  );
}

export default Navbar;