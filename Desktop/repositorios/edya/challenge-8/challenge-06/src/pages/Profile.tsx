import { useAuthContext } from "../context/AuthContext"
import { useTaskContext } from "../context/TaskContext"

const Profile = () => {
  const { user }  = useAuthContext()
  const { tasks } = useTaskContext()

  return (
    <div className="page-content">
      <h1 className="page-title">Mi Perfil</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          {user?.email?.[0].toUpperCase() ?? "?"}
        </div>
        <div className="profile-info">
          <p className="profile-email">{user?.email}</p>
          <p className="profile-uid">UID: {user?.uid}</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <p className="stat-value">{tasks.length}</p>
          <p className="stat-label">Total tareas</p>
        </div>
        <div className="stat-box">
          <p className="stat-value">{tasks.filter(t => !t.done).length}</p>
          <p className="stat-label">Pendientes</p>
        </div>
        <div className="stat-box">
          <p className="stat-value">{tasks.filter(t => t.done).length}</p>
          <p className="stat-label">Completadas</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
