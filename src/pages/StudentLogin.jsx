import { useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "student123") {
      alert("Student Login Successful");
      navigate("/student-dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleLogin}>

        <h2>Student Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit" className="btn">
          Login
        </button>

      </form>
    </div>
  );
}

export default StudentLogin;