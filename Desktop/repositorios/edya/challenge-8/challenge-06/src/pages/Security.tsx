const Security = () => {
  return (
    <div className="page-content">
      <h1 className="page-title">Seguridad</h1>
      <p className="page-subtitle">Gestiona el acceso a tu cuenta</p>

      <div className="info-card">
        <div className="info-row">
          <span className="info-label">Contraseña</span>
          <span className="info-value">••••••••</span>
        </div>
        <div className="info-row">
          <span className="info-label">Último acceso</span>
          <span className="info-value">{new Date().toLocaleDateString("es-CO")}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Autenticación 2FA</span>
          <span className="info-badge info-badge--no">No configurada</span>
        </div>
      </div>

      <div className="security-notice">
        <p>💡 Para cambiar tu contraseña, cierra sesión e inicia el proceso de recuperación desde la pantalla de inicio.</p>
      </div>
    </div>
  )
}

export default Security
