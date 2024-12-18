// Libreria
import { useContext } from "react";

// Context
import Context from "../context/Provider.jsx";

// Hook que nos permite acceder a las funciones
const useProvider = () => {
    return useContext(Context)
}

export default useProvider