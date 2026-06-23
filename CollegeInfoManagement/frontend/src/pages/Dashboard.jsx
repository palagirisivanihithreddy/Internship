import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import {
  getDashboardStats,
  getCourseStats,
  getRecentColleges
} from "../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    totalColleges: 0,
    totalStudents: 0,
    totalDepartments: 0,
    totalPlacements: 0,
    totalFaculties: 0
  });

  const [courseStats, setCourseStats] =
    useState([]);

  const [recentColleges, setRecentColleges] =
    useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const statsData =
        await getDashboardStats();

      const courseData =
        await getCourseStats();

      const recentData =
        await getRecentColleges();

      setStats(statsData);
      setCourseStats(courseData);
      setRecentColleges(recentData);

    } catch (error) {

      console.log(
        "Dashboard Error:",
        error
      );
    }
  };

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#14b8a6"
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
          marginBottom: "10px"
        }}
      >
        📊 College Analytics Dashboard
      </h1>

      <button
        onClick={loadDashboard}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        🔄 Refresh Dashboard
      </button>

      <h3
        style={{
          marginBottom: "25px",
          color: "#cbd5e1"
        }}
      >
        📅 {new Date().toLocaleString()}
      </h3>

      {/* Stats Cards */}

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
          <h1>{stats.totalFaculties}</h1>
        </div>

      </div>

      {/* Course Distribution */}

      <div
        style={{
          background: "#15264f",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "40px"
        }}
      >

        <h2>
          📊 Course Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <BarChart data={courseStats}>
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="count"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Pie Chart */}

      <div
        style={{
          background: "#15264f",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "40px"
        }}
      >

        <h2>
          🥧 Course Share
        </h2>

        <ResponsiveContainer
          width="100%"
          height={450}
        >
          <PieChart>

            <Pie
              data={courseStats}
              dataKey="count"
              nameKey="course"
              outerRadius={150}
              label
            >

              {courseStats.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Legend />
            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Recent Colleges */}

      <div
        style={{
          background: "#15264f",
          padding: "20px",
          borderRadius: "15px"
        }}
      >

        <h2>
          🆕 Recently Added Colleges
        </h2>

        <br />

        {recentColleges.length > 0 ? (

          recentColleges.map(
            (college) => (

              <div
                key={college.id}
                style={{
                  padding: "15px",
                  marginBottom: "15px",
                  background: "#1e3a8a",
                  borderRadius: "10px"
                }}
              >

                <h3>
                  {college.name}
                </h3>

                <p>
                  📍 {college.city}
                </p>

                <p>
                  🎓 {college.courseType}
                </p>

                <p>
                  ⭐ {college.rating}
                </p>

                <p>
                  🏆 Rank: {college.ranking}
                </p>

              </div>
            )
          )

        ) : (

          <h3>
            No Colleges Available
          </h3>

        )}

      </div>

      {/* Top Rated Colleges */}

      <div
        style={{
          background: "#15264f",
          padding: "20px",
          borderRadius: "15px",
          marginTop: "30px"
        }}
      >

        <h2>
          🏆 Top Rated Colleges
        </h2>

        <br />

        {[...recentColleges]
          .sort(
            (a, b) =>
              (b.rating || 0) -
              (a.rating || 0)
          )
          .slice(0, 5)
          .map((college) => (

            <div
              key={college.id}
              style={{
                padding: "15px",
                marginBottom: "15px",
                background: "#1e3a8a",
                borderRadius: "10px"
              }}
            >

              <h3>
                {college.name}
              </h3>

              <p>
                ⭐ {college.rating}
              </p>

              <p>
                🏆 Rank #{college.ranking}
              </p>

            </div>
          ))}

      </div>

    </div>
  );
}

export default Dashboard;