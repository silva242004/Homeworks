import { Navigate } from "react-router-dom"
import { ReactNode } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuthContext()

  // Si no hay usuario logueado, redirige al login
  if (!user) return <Navigate to="/" replace />

  return <>{children}</>
}

export default PrivateRoute
