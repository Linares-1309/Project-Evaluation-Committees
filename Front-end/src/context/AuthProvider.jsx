/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import ClientAxios from "../config/AxiosConfig.jsx";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUser = async () => {
      const token = localStorage.getItem("token");
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
        console.log(error.response.data.msg);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
