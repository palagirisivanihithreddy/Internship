import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

import {
  getColleges,
  getDashboardStats
} from "../services/api";

function Home() {

  const [stats, setStats] = useState({
    totalColleges: 0,
    totalStudents: 0,
    totalDepartments: 0,
    totalPlacements: 0
  });

  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const dashboardData =
        await getDashboardStats();

      const collegeData =
        await getColleges();

      setStats(dashboardData);
      setColleges(collegeData);

    } catch (error) {

      console.log(
        "Home Load Error:",
        error
      );
    }
  };

  const courses = [
    "BTech",
    "MBA",
    "MTech",
    "MBBS",
    "BCA",
    "BBA",
    "MCA",
    "LAW"
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#071330",
        color: "white",
        padding: "30px"
      }}
    >

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px"
        }}
      >
        🎓 CollegeHub
      </h1>

      <p
        style={{
          fontSize: "18px",
          marginBottom: "25px"
        }}
      >
        Smart College Information Management Platform
      </p>

      {/* Search Bar */}

      <SearchBar />

      <br />

      {/* Dashboard Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        <div
          style={{
            background: "#15264f",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center"
          }}
        >
          <h3>Colleges</h3>
          <h1>{stats.totalColleges}</h1>
        </div>

        <div
          style={{
            background: "#15264f",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center"
          }}
        >
          <h3>Students</h3>
          <h1>{stats.totalStudents}</h1>
        </div>

        <div
          style={{
            background: "#15264f",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center"
          }}
        >
          <h3>Departments</h3>
          <h1>{stats.totalDepartments}</h1>
        </div>

        <div
          style={{
            background: "#15264f",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center"
          }}
        >
          <h3>Placements</h3>
          <h1>{stats.totalPlacements}</h1>
        </div>

      </div>

      {/* Courses */}

      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        Courses
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px"
        }}
      >
        {courses.map((course) => (
          <Link
            key={course}
            to={`/course/${course}`}
            style={{
              textDecoration: "none"
            }}
          >
            <button
              style={{
                width: "100%",
                padding: "20px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              {course}
            </button>
          </Link>
        ))}
      </div>

      <br />
      <br />

      {/* Colleges */}

      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        Top Colleges
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px"
        }}
      >
        {colleges.length > 0 ? (
          colleges.map((college) => (
            <div
              key={college.id}
              style={{
                background: "#15264f",
                padding: "20px",
                borderRadius: "12px"
              }}
            >
              <h3>{college.name}</h3>

              <p>
                📍 {college.city}
              </p>

              <p>
                ⭐ {college.rating}
              </p>

              <p>
                🎓 {college.courseType}
              </p>

              <Link
                to={`/college/${college.id}`}
              >
                <button
                  style={{
                    marginTop: "10px",
                    padding:
                      "10px 15px",
                    background:
                      "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <h3>No Colleges Found</h3>
        )}
      </div>

      <br />
      <br />

      {/* Admin */}

      <Link to="/admin-login">
        <button
          style={{
            padding: "15px 25px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Admin Login
        </button>
      </Link>

    </div>
  );
}

export default Home;