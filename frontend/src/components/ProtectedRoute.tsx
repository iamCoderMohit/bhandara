import { Navigate, Outlet } from "react-router"

interface ProtectedRouteProps {
  isAuthenticated: boolean,
  redirectPath?: string
}

function ProtectedRoute({isAuthenticated, redirectPath = "/signin"}: ProtectedRouteProps) {
  if(!isAuthenticated) {
    return <Navigate to={redirectPath} />
  }

  return <Outlet />
}

export default ProtectedRoute