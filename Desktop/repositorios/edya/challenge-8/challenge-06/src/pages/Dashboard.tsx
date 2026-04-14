import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import { useTaskContext } from "../context/TaskContext"

const Dashboard = () => {
  const { user }  = useAuthContext()
  const { tasks } = useTaskContext()

  const pending   = tasks.filter(t => !t.done).length
  const completed = tasks.filter(t => t.done).length

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Bienvenido, <strong>{user?.email}</strong></p>
      </header>

      <div className="dashboard-grid">
        <Link to="/tasks" className="dashboard-card dashboard-card--primary">
          <span className="dashboard-card-icon">✅</span>
          <div>
            <p className="dashboard-card-label">Tareas pendientes</p>
            <p className="dashboard-card-value">{pending}</p>
          </div>
        </Link>

        <Link to="/tasks" className="dashboard-card dashboard-card--success">
          <span className="dashboard-card-icon">🎉</span>
          <div>
            <p className="dashboard-card-label">Completadas</p>
            <p className="dashboard-card-value">{completed}</p>
          </div>
        </Link>

        <Link to="/profile" className="dashboard-card dashboard-card--info">
          <span className="dashboard-card-icon">👤</span>
          <div>
            <p className="dashboard-card-label">Mi perfil</p>
            <p className="dashboard-card-value">Ver</p>
          </div>
        </Link>

        <Link to="/settings" className="dashboard-card dashboard-card--neutral">
          <span className="dashboard-card-icon">⚙️</span>
          <div>
            <p className="dashboard-card-label">Configuración</p>
            <p className="dashboard-card-value">Abrir</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
