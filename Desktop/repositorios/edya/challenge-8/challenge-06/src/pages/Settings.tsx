import { Link } from "react-router-dom"

const Settings = () => {
  return (
    <div className="page-content">
      <h1 className="page-title">Configuración</h1>
      <p className="page-subtitle">Administra tu cuenta y seguridad</p>

      <div className="settings-list">
        <Link to="/settings/account" className="settings-item">
          <span className="settings-item-icon">👤</span>
          <div>
            <p className="settings-item-title">Cuenta</p>
            <p className="settings-item-desc">Actualiza tu información personal</p>
          </div>
          <span className="settings-item-arrow">›</span>
        </Link>

        <Link to="/settings/security" className="settings-item">
          <span className="settings-item-icon">🔒</span>
          <div>
            <p className="settings-item-title">Seguridad</p>
            <p className="settings-item-desc">Contraseña y acceso a tu cuenta</p>
          </div>
          <span className="settings-item-arrow">›</span>
        </Link>
      </div>
    </div>
  )
}

export default Settings
