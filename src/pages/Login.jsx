import { useState } from "react";
import "../styles/Login.css";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    alert("Login Submitted");
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          Show / Hide Password
        </button>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
