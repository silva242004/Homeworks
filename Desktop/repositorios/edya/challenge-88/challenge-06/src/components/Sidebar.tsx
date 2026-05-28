import { NavLink } from "react-router-dom"
import { useSongsContext } from "../context/SongsContext"

const navLinks = [
  { to: "/", label: "Inicio", icon: "🏠" },
  { to: "/search", label: "Buscar", icon: "🔍" },
  { to: "/rankings", label: "Rankings", icon: "📊" },
  { to: "/recommendations", label: "Recomendaciones", icon: "🎵" },
  { to: "/favorites", label: "Favoritos", icon: "❤️" },
]

export function Sidebar() {
  const { openAddSong, songs } = useSongsContext()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        
        <span className="logo-text">ECUALIZER</span>
      </div>

      <nav className="sidebar-nav">
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-add">
        <button className="add-song-btn" onClick={openAddSong}>
          <span>+</span>
          <span>Nueva canción</span>
        </button>
        <p className="songs-count">{songs.length} canciones</p>
      </div>

      
    </aside>
  )
}
