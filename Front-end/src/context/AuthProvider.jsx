/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import ClientAxios from "../config/AxiosConfig.jsx";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});
  const [roleUser, setRoleUser] = useState("");

  useEffect(() => {
    const autenticarUser = async () => {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token)
      setRoleUser(decode.rol)

      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const url = `/user/profile`;
        const { data } = await ClientAxios(url, config);
        setAuth(data);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUser();
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    localStorage.removeItem("token");
    setAuth({});
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        roleUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
