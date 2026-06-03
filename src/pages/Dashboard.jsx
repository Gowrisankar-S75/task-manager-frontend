import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setError("");
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to load tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      (task.description || "").toLowerCase().includes(query) ||
      task.status.toLowerCase().includes(query)
    );
  });

  const pendingCount = tasks.filter((task) => task.status === "pending").length;
  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  if (loading) {
    return (
      <div className="page">
        <div className="container centered">
          <h2>Dashboard</h2>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="card topbar">
          <div>
            <h2>Dashboard</h2>
            <p>Manage your tasks in one place</p>
          </div>

          <button className="danger-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="stats">
          <div className="stat pending">
            <h3>Pending</h3>
            <div className="stat-value">{pendingCount}</div>
          </div>

          <div className="stat completed">
            <h3>Completed</h3>
            <div className="stat-value">{completedCount}</div>
          </div>

          <div className="stat total">
            <h3>Total Tasks</h3>
            <div className="stat-value">{tasks.length}</div>
          </div>
        </div>

        <div className="toolbar">
          <input
            className="input search"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link className="primary-btn" to="/tasks/new" style={{ display: "inline-flex", alignItems: "center" }}>
            Create Task
          </Link>
        </div>

        {error && <p className="error">{error}</p>}

        {filteredTasks.length === 0 ? (
          <div className="card" style={{ padding: 24, textAlign: "center" }}>
            {search ? <p>No tasks match your search.</p> : <p>No tasks found.</p>}
            <p className="helper">
              <Link to="/tasks/new">Create your first task</Link>
            </p>
          </div>
        ) : (
          <div className="task-grid">
            {filteredTasks.map((task) => (
              <div key={task._id} className="task-card">
                <div className="task-head">
                  <div>
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-desc">{task.description}</p>
                  </div>

                  <span
                    className={`badge ${task.status === "completed" ? "completed" : "pending"}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="task-actions">
                  <button
                    className="secondary-btn"
                    onClick={() => navigate(`/tasks/edit/${task._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="danger-btn"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="footer">
          Task Manager
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;