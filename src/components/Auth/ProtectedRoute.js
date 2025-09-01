import React, { Children } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Пока состояние загружается, показываем индикатор загрузки
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
}
export default ProtectedRoute;
