/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth, roleUser } = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(roleUser)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
