import { useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from "firebase/auth"
import { auth } from "../firebase/config"

interface AuthError {
  code:    string
  message: string
}

const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  // ── Register ──────────────────────────────────────
  const register = async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    setLoading(true)
    setError(null)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result
    } catch (e) {
      const err = e as AuthError
      setError(traducirError(err.code))
      return null
    } finally {
      setLoading(false)
    }
  }

  // ── Login ─────────────────────────────────────────
  const login = async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    setLoading(true)
    setError(null)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result
    } catch (e) {
      const err = e as AuthError
      setError(traducirError(err.code))
      return null
    } finally {
      setLoading(false)
    }
  }

  // ── Logout ────────────────────────────────────────
  const logout = async (): Promise<void> => {
    setLoading(true)
    try {
      await signOut(auth)
    } catch (e) {
      const err = e as AuthError
      setError(traducirError(err.code))
    } finally {
      setLoading(false)
    }
  }

  // ── Traduce errores de Firebase al español ────────
  const traducirError = (code: string): string => {
    const errores: Record<string, string> = {
      "auth/email-already-in-use":    "El correo ya está registrado",
      "auth/invalid-email":           "Correo inválido",
      "auth/weak-password":           "La contraseña debe tener mínimo 6 caracteres",
      "auth/user-not-found":          "Usuario no encontrado",
      "auth/wrong-password":          "Contraseña incorrecta",
      "auth/invalid-credential":      "Credenciales inválidas",
      "auth/too-many-requests":       "Demasiados intentos, intenta más tarde",
      "auth/network-request-failed":  "Error de conexión, revisa tu internet",
    }
    return errores[code] ?? "Ocurrió un error inesperado"
  }

  return { loading, error, register, login, logout }
}

export default useAuth