import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import CourseColleges from "./pages/CourseColleges";
import CollegeDetails from "./pages/CollegeDetails";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminColleges from "./pages/AdminColleges";
import AdminDepartments from "./pages/AdminDepartments";
import AdminStudents from "./pages/AdminStudents";
import AdminFaculties from "./pages/AdminFaculties";
import AdminPlacements from "./pages/AdminPlacements";

import CollegeAssistant from "./pages/CollegeAssistant";

import "./styles/Global.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/news"
          element={<News />}
        />

        <Route
          path="/course/:courseType"
          element={<CourseColleges />}
        />

        <Route
          path="/college/:id"
          element={<CollegeDetails />}
        />

        {/* ========================= */}
        {/* AI ASSISTANT */}
        {/* ========================= */}

        <Route
          path="/assistant"
          element={<CollegeAssistant />}
        />

        {/* ========================= */}
        {/* ADMIN ROUTES */}
        {/* ========================= */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/colleges"
          element={<AdminColleges />}
        />

        <Route
          path="/admin/departments"
          element={<AdminDepartments />}
        />

        <Route
          path="/admin/students"
          element={<AdminStudents />}
        />

        <Route
          path="/admin/faculties"
          element={<AdminFaculties />}
        />

        <Route
          path="/admin/placements"
          element={<AdminPlacements />}
        />

      </Routes>

      {/* ========================= */}
      {/* FLOATING AI BUTTON */}
      {/* ========================= */}

      <Link
        to="/assistant"
        style={{
          position: "fixed",
          right: "25px",
          bottom: "25px",
          width: "70px",
          height: "70px",
          background: "#7c3aed",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          fontSize: "32px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          zIndex: 9999
        }}
      >
        🤖
      </Link>

    </BrowserRouter>
  );
}

export default App;