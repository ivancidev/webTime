import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({ children }) => {
  const isRegistered = localStorage.getItem("isRegistered");

  if (isRegistered) {
    return <Navigate to="/app" replace />;
  }
  return children;
};
