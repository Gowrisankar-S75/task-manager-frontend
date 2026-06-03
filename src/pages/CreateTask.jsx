import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/tasks", { title, description, status });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="auth-shell">
  <div className="card auth-form-card" style={{ maxWidth: 520 }}>
        <div className="brand">
          <div className="brand-badge">+</div>
          <div>
            <h1 className="brand-title">Create Task</h1>
            <p className="brand-subtitle">Add a new item to your workflow</p>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <input
              className="input"
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Description</label>
            <textarea
              className="textarea"
              placeholder="Task details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="label">Status</label>
            <select
              className="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="primary-btn" type="submit">
              Save Task
            </button>
            <Link className="ghost-btn" to="/" style={{ display: "inline-flex", alignItems: "center" }}>
              Cancel
            </Link>
          </div>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default CreateTask;