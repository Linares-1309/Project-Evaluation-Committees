/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import ClientAxios from "../config/AxiosConfig.jsx";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});
  const [roleUser, setRoleUser] = useState("");

  useEffect(() => {
    const autenticarUser = async () => {
      setCargando(true)
      const token = localStorage.getItem("token");

      if (!token) {
        setAuth({});
        setRoleUser(null);
        setCargando(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        setRoleUser(decodedToken.rol); 

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const url = `/user/profile`;
        const { data } = await ClientAxios(url, config);
        setAuth(data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setAuth({});
        setRoleUser(null);
      } finally {
        setCargando(false); // Terminamos la carga
      }
    };
    autenticarUser();
  }, []);

  if (cargando) {
    return <div>Cargando...</div>;
  }

  const cerrarSesion = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    setAuth({});
    setRoleUser("");
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        roleUser,
        setRoleUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
