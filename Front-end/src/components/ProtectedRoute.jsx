/* eslint-disable react/prop-types */
// Libreria
import { Navigate, Outlet } from "react-router-dom";

// Componente del Hook
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  // Obtener el usuario y el rol desde el provider por medio de su Hook useAuth
  const { auth, roleUser } = useAuth();

  // Verificar si hay un usuario Logeado, de lo contrario se navega al login
  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  // Validar el rol de usario, si no tiene permisos se redirecciona a la pagina de no Autorizado
  if (!allowedRoles.includes(roleUser)) {
    return <Navigate to="/unauthorized" />;
  }

  // Retorna el cuerpo de la aplicacion
  return <Outlet />;
};

export default ProtectedRoute;
