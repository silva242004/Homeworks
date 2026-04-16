import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import { TreeProvider } from "./context/TreeContext"
import { useAuthContext } from "./hooks/useAuthContext"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext()

  if (user) return <Navigate to="/home" replace />

  return <>{children}</>
}

const App = () => {
  return (
    <BrowserRouter>
      <TreeProvider>
        <Routes>
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
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TreeProvider>
    </BrowserRouter>
  )
}

export default App
