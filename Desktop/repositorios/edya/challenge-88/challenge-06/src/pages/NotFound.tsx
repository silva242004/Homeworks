import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="page not-found-page">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-msg">Página no encontrada.</p>
      <Link to="/" className="action-btn">Volver al inicio</Link>
    </div>
  )
}
