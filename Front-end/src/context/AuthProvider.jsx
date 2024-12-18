/* eslint-disable react/prop-types */

// Libreias
import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { Hourglass } from "react-loader-spinner";

// Componente de la instancia de Axios
import ClientAxios from "../config/AxiosConfig.jsx";

// Crear el context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});
  const [roleUser, setRoleUser] = useState("");

  // Actualizar en tiempo real la foto del usuario
  const updateAvatar = (newAvatar) => {
    setAuth((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        userPotho: newAvatar,
      },
    }));
  };

  useEffect(() => {
    const autenticarUser = async () => {
      // Indicar que la pagina esta cargando
      setCargando(true)
      // Obtener el toke del LocalStorage
      const token = localStorage.getItem("token");

      // Validar que exista un token 
      if (!token) {
        setAuth({});
        setRoleUser(null);
        setCargando(false);
        return;
      }

      try {
        // Si existe el token se decodifica para obtener el rol de usuario
        const decodedToken = jwtDecode(token);
        setRoleUser(decodedToken.rol); 

        // Peticion a axios para obterner el perfil
        const url = `/user/profile`;
        const { data } = await ClientAxios(url);
        setAuth(data);
      } catch (error) {
        // En caso de error se borra el token del LocalStorage
        console.error(error.respoonse.data.msg);
        localStorage.removeItem("token");
        setAuth({});
        setRoleUser(null);
      } finally {
        // Terminamos la carga
        setCargando(false); 
      }
    };
    autenticarUser();
  }, []);

  // Si la pagina esta Cargando se muestra el loader
  if (cargando) {
    return (
      <>
        <div className="items-center align-middle flex justify-center w-full h-screen flex-col">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
          <h1 className="text-2xl font-serif font-semibold">Loading...</h1>
        </div>
      </>
    );
  }

  // Funcion para cerrar sesion limpiando el LocalStorage
  const cerrarSesion = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    setAuth({});
    setRoleUser("");
  };
  // Retornamos el contexto para propagar las funciones y poderlas usar en los demas conponentes
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        roleUser,
        setRoleUser,
        updateAvatar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
