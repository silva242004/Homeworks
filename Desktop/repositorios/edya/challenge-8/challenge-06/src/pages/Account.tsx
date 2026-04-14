import { useAuthContext } from "../context/AuthContext"

const Account = () => {
  const { user } = useAuthContext()

  return (
    <div className="page-content">
      <h1 className="page-title">Cuenta</h1>
      <p className="page-subtitle">Información de tu cuenta</p>

      <div className="info-card">
        <div className="info-row">
          <span className="info-label">Correo electrónico</span>
          <span className="info-value">{user?.email}</span>
        </div>
        <div className="info-row">
          <span className="info-label">UID</span>
          <span className="info-value info-value--mono">{user?.uid}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Proveedor</span>
          <span className="info-value">Email / Password</span>
        </div>
        <div className="info-row">
          <span className="info-label">Email verificado</span>
          <span className={`info-badge ${user?.emailVerified ? "info-badge--yes" : "info-badge--no"}`}>
            {user?.emailVerified ? "Verificado" : "Sin verificar"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Account
