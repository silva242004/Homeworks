import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const { register, loading, error } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (password !== confirm) {
      setFormError("Las contrasenas no coinciden")
      return
    }

    if (password.length < 6) {
      setFormError("La contrasena debe tener minimo 6 caracteres")
      return
    }

    const result = await register(email, password)

    if (result) navigate("/home")
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-subtitle">Crea tu acceso a la aplicacion</p>

        {(error || formError) && (
          <p className="auth-error">{formError ?? error}</p>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contrasena</label>
            <input
              id="password"
              type="password"
              placeholder="Minimo 6 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirmar contrasena</label>
            <input
              id="confirm"
              type="password"
              placeholder="Repite tu contrasena"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-link">
          Ya tienes cuenta? <Link to="/">Inicia sesion</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
