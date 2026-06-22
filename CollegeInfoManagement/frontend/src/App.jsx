import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CourseColleges from "./pages/CourseColleges";
import CollegeDetails from "./pages/CollegeDetails";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import "./styles/Global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* News */}
        <Route path="/news" element={<News />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Course Colleges */}
        <Route
          path="/course/:courseType"
          element={<CourseColleges />}
        />

        {/* College Details */}
        <Route
          path="/college/:id"
          element={<CollegeDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;