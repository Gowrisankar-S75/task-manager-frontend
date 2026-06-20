import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", res.data);

    localStorage.setItem("token", res.data.token);

    console.log(
      "TOKEN AFTER SAVE:",
      localStorage.getItem("token")
    );

    navigate("/");
  } catch (err) {
    console.log(err);
    setError(err.response?.data?.message || "Login failed");
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
                <p
                  className="brand-subtitle"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  Plan your work, track progress, finish faster
                </p>
              </div>
            </div>

            <h2>Welcome back.</h2>
            <p>
              Sign in to continue managing your tasks, tracking progress, and
              staying organized in one place.
            </p>

            <div className="auth-points">
              <div className="auth-point">
                <strong>Stay focused</strong>
                Keep all your tasks in one simple dashboard.
              </div>
              <div className="auth-point">
                <strong>Track progress</strong>
                See what is pending and what is done instantly.
              </div>
              <div className="auth-point">
                <strong>Work faster</strong>
                Create, edit, and delete tasks in just a few clicks.
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
              <div className="brand-badge">→</div>
              <div>
                <h1 className="brand-title">Sign in</h1>
                <p className="brand-subtitle">Enter your account details</p>
              </div>
            </div>

            <form className="form" onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="primary-btn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {error && <p className="error">{error}</p>}

            <p className="helper" style={{ marginTop: 14 }}>
              No account yet? <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;