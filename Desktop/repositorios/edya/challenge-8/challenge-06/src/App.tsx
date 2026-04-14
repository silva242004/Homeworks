import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import Layout      from "./components/Layout"
import Login       from "./pages/Login"
import Register    from "./pages/Register"
import menuTree, { flattenTree } from "./data/menuTree"

// ─── Public-only guard (redirect if already logged in) ─
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext()
  if (user) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

// ─── App ──────────────────────────────────────────────
const App = () => {
  // Flatten N-ary tree → flat list of route nodes (DFS pre-order)
  const allRoutes = flattenTree(menuTree)

  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public routes (outside sidebar layout) ─── */}
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

        {/* ── Protected routes (inside sidebar Layout) ─ */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Dynamically generate a <Route> per tree node */}
          {allRoutes.map(node => (
            <Route
              key={node.path}
              path={node.path}
              element={<node.component />}
            />
          ))}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
