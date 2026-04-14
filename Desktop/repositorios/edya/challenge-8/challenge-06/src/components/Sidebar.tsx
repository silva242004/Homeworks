import { useAuthContext } from "../context/AuthContext"
import MenuItem from "./MenuItem"
import menuTree from "../data/menuTree"

const Sidebar = () => {
  const { user, logout } = useAuthContext()

  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">⚡</span>
        <span className="sidebar-brand-name">TaskApp</span>
      </div>

      {/* Navigation — tree traversed recursively */}
      <nav className="sidebar-nav" aria-label="Menú principal">
        <MenuItem node={menuTree} depth={0} />
      </nav>

      {/* User info + logout */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.email?.[0].toUpperCase() ?? "?"}
          </div>
          <span className="sidebar-email" title={user?.email ?? ""}>
            {user?.email}
          </span>
        </div>
        <button className="sidebar-logout" onClick={logout} title="Cerrar sesión">
          ⏻
        </button>
      </div>

    </aside>
  )
}

export default Sidebar
