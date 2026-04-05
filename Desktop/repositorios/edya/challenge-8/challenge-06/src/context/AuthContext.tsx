import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "../firebase/config"
import useAuth from "../hooks/useAuth"

// ─── Tipos ────────────────────────────────────────────
interface AuthContextType {
  user:     User | null
  loading:  boolean
  error:    string | null
  login:    (email: string, password: string) => Promise<any>
  register: (email: string, password: string) => Promise<any>
  logout:   () => Promise<void>
}

// ─── Contexto ─────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null)

// ─── Provider ─────────────────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user,        setUser]        = useState<User | null>(null)
  const [authReady,   setAuthReady]   = useState(false)
  const { loading, error, login, register, logout } = useAuth()

  // Escucha si hay un usuario logueado al cargar la app
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setAuthReady(true)
    })
    return () => unsub()
  }, [])

  // No renderiza nada hasta saber el estado de auth
  if (!authReady) return <p>Cargando...</p>

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook para consumir el contexto ───────────────────
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider")
  }
  return context
}