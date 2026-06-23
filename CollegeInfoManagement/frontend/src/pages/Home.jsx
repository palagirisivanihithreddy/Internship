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
    totalPlacements: 0,
    totalFaculties: 0
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
          fontSize: "55px",
          marginBottom: "10px"
        }}
      >
        🎓 CollegeHub
      </h1>

      <p
        style={{
          fontSize: "20px",
          marginBottom: "25px",
          color: "#cbd5e1"
        }}
      >
        Smart College Information Management Platform
      </p>

      {/* Quick Actions */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "30px"
        }}
      >

        <Link to="/dashboard">
          <button
            style={{
              padding: "15px 25px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            📊 Analytics Dashboard
          </button>
        </Link>

        <Link to="/admin-login">
          <button
            style={{
              padding: "15px 25px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            🔐 Admin Login
          </button>
        </Link>

        <Link to="/assistant">
          <button
            style={{
              padding: "15px 25px",
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            🤖 AI Assistant
          </button>
        </Link>

      </div>

      {/* AI Assistant Card */}

      <div
        style={{
          background: "#15264f",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "30px",
          border: "2px solid #7c3aed"
        }}
      >

        <h2>
          🤖 College AI Assistant
        </h2>

        <p
          style={{
            color: "#cbd5e1",
            marginTop: "10px",
            marginBottom: "20px"
          }}
        >
          Ask questions about colleges, students,
          departments, placements, faculties and rankings.
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap"
          }}
        >
          <span>• How many colleges?</span>
          <span>• Top college</span>
          <span>• List colleges</span>
          <span>• How many students?</span>
          <span>• Show departments</span>
        </div>

        <Link to="/assistant">

          <button
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Open AI Assistant →
          </button>

        </Link>

      </div>

      <SearchBar />

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
          <h3>🏫 Colleges</h3>
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
          <h3>👨‍🎓 Students</h3>
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
          <h3>🏢 Departments</h3>
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
          <h3>💼 Placements</h3>
          <h1>{stats.totalPlacements}</h1>
        </div>

        <div
          style={{
            background: "#15264f",
            padding: "25px",
            borderRadius: "15px",
            textAlign: "center"
          }}
        >
          <h3>👨‍🏫 Faculties</h3>
          <h1>{stats.totalFaculties || 0}</h1>
        </div>

      </div>

      <h2 style={{ marginBottom: "20px" }}>
        📚 Courses
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

      <h2
        style={{
          marginBottom: "20px"
        }}
      >
        🏆 Top Colleges
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

          colleges.slice(0, 6).map((college) => (

            <div
              key={college.id}
              style={{
                background: "#15264f",
                padding: "20px",
                borderRadius: "12px"
              }}
            >

              <h3>{college.name}</h3>

              <p>📍 {college.city}</p>

              <p>⭐ {college.rating}</p>

              <p>🎓 {college.courseType}</p>

              <p>🏆 Rank #{college.ranking}</p>

              <Link
                to={`/college/${college.id}`}
              >
                <button
                  style={{
                    marginTop: "10px",
                    padding: "10px 15px",
                    background: "#2563eb",
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

    </div>
  );
}

export default Home;