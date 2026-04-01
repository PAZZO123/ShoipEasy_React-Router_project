import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute — wraps private pages.
 * If the user is not authenticated, redirect to /login
 * and pass the current path as `state.from` so Login can
 * redirect back after a successful sign-in.
 */
export default function ProtectedRoute() {
  const { isAuth } = useAuth();
  const location   = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
