import { useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem(
      "studentId",
      data.user.id
    );

    localStorage.setItem(
      "studentName",
      data.user.name
    );

    alert("Login Successful");

    navigate("/student-dashboard");

  } catch (error) {

    console.log(error);

    alert("Login Failed");

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