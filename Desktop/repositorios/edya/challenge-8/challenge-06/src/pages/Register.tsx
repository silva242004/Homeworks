import { useState, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const Register = () => {
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [confirm,  setConfirm]  = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  const { register, loading, error } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)

    // Validación local antes de llamar a Firebase
    if (password !== confirm) {
      setFormError("Las contraseñas no coinciden")
      return
    }
    if (password.length < 6) {
      setFormError("La contraseña debe tener mínimo 6 caracteres")
      return
    }

    const result = await register(email, password)
    if (result) navigate("/dashboard")
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-subtitle">Empieza a organizar tus tareas 🚀</p>

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
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirmar contraseña</label>
            <input
              id="confirm"
              type="password"
              placeholder="Repite tu contraseña"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tienes cuenta?{" "}
          <Link to="/">Inicia sesión</Link>
        </p>

      </div>
    </div>
  )
}

export default Register