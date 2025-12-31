import React from "react";
import { Navigate } from "react-router-dom";

// Simple client-side auth check. Replace with real auth/context as needed.
const isAuthenticated = () => {
  try {
    return localStorage.getItem("isLoggedIn") === "true";
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
};

export default ProtectedRoute;
