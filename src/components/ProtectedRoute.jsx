import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser === null) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
