// Libreia
import { useContext } from "react";

// Context
import AuthContext from "../context/AuthProvider.jsx";

// Hook que nos permite acceder a las funciones
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth