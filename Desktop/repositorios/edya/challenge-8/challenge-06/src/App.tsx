import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import Login    from "./pages/Login"
import Register from "./pages/Register"
import Tasks    from "./pages/Tasks"

// ─── Ruta pública ─────────────────────────────────────
// Si el usuario YA está logueado y trata de ir a /login
// lo manda directo a /tasks
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext()
  if (user) return <Navigate to="/tasks" replace />
  return <>{children}</>
}

// ─── App ──────────────────────────────────────────────
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas — solo si NO está logueado */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Ruta privada — solo si ESTÁ logueado */}
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />

        {/* Cualquier ruta desconocida → login */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App