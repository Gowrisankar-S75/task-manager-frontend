import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function EditTask() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description || "");
        setStatus(res.data.status);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.put(`/tasks/${id}`, { title, description, status });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  if (loading) {
    return (
      <div className="auth-shell">
        <div className="card auth-form-card centered" style={{ maxWidth: 520 }}>
          <p>Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <div className="card auth-form-card" style={{ maxWidth: 520 }}>
        <div className="brand">
          <div className="brand-badge">✎</div>
          <div>
            <h1 className="brand-title">Edit Task</h1>
            <p className="brand-subtitle">Update task details</p>
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
              Update Task
            </button>
            <Link className="ghost-btn" to="/" style={{ display: "inline-flex", alignItems: "center" }}>
              Back
            </Link>
          </div>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default EditTask;