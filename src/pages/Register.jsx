import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="auth-shell">
      <div className="card auth-grid">
        <div className="auth-hero">
          <div>
            <div className="brand" style={{ marginBottom: 24 }}>
              <div className="brand-badge">T</div>
              <div>
                <h1 className="brand-title" style={{ color: "white" }}>
                  Task Manager
                </h1>
                <p className="brand-subtitle" style={{ color: "rgba(255,255,255,0.85)" }}>
                  Start organizing your tasks today
                </p>
              </div>
            </div>

            <h2>Create your account.</h2>
            <p>
              Register once and start managing your tasks with a clean, simple,
              and responsive dashboard.
            </p>

            <div className="auth-points">
              <div className="auth-point">
                <strong>Quick setup</strong>
                Create your workspace in less than a minute.
              </div>
              <div className="auth-point">
                <strong>Easy workflow</strong>
                Add tasks, update status, and stay on track.
              </div>
              <div className="auth-point">
                <strong>Modern UI</strong>
                Clean and professional design built for usability.
              </div>
            </div>
          </div>

          <p style={{ marginTop: 30, opacity: 0.9 }}>
            Built with React, Node.js, and MongoDB
          </p>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-form-card">
            <div className="brand">
              <div className="brand-badge">+</div>
              <div>
                <h1 className="brand-title">Register</h1>
                <p className="brand-subtitle">Create your new account</p>
              </div>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="primary-btn" type="submit">
                Register
              </button>
            </form>

            {error && <p className="error">{error}</p>}

            <p className="helper" style={{ marginTop: 14 }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;