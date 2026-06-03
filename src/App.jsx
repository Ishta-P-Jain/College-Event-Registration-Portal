import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import StudentLogin from "./pages/StudentLogin.jsx";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MyRegistrations from "./pages/MyRegistrations";
import AdminStats from "./components/AdminStats";
import EventStudents from "./pages/EventStudents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/admin-stats" element={<AdminStats />} />
        <Route path="/event-students/:id" element={<EventStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;