import { Navigate, Outlet } from "react-router";

import { getAuthData } from "../utils/session-storage";

function ProtectedRoute() {
  const authData = getAuthData();

  const isAuthenticated = Boolean(authData?.session?.accessToken);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
