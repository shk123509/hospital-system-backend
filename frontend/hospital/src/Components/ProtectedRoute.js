import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  try {
    return user && user !== "undefined" ? children : <Navigate to="/login" replace />;
  } catch {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
