import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">

        <h1>College Event Portal</h1>

        <p>Select Login Type</p>

        <button
          className="btn"
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </button>

        <button
          className="btn secondary"
          onClick={() => navigate("/student-login")}
        >
          Student Login
        </button>

      </div>
    </div>
  );
}

export default RoleSelection;