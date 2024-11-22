import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./UserFuctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import { Link, useNavigate } from "react-router-dom";
import useAuth from './../../../hooks/useAuth.jsx';

const Login = () => {
  const [Id_User, setId_User] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate()
  const { setAuth } = useAuth();
  // Usamos useMutation para hacer la mutación de login
  const { mutate, isLoading} = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Si el login es exitoso, almacenamos el token
      localStorage.setItem("token", data.token);
      setAuth(data)
      setAlerta({
        msg: data.msg,
        error: false,
      });
      navigate("/admin")
      // const timer = setTimeout(() => {
      // }, 2000);
  
      // return () => clearTimeout(timer); 
    },
    onError: (error) => {
      // Limpiar el localStorage
      localStorage.removeItem("token")
      localStorage.clear()
      // Si ocurre un error, mostramos el mensaje de error
      setAlerta({
        msg: error.msg, // El mensaje es extraído del error lanzado
        error: true,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([Id_User, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios!",
        error: true,
      });
      return;
    }

    const credentials = { Id_User, password };
    mutate(credentials); // Llamamos a la mutación con las credenciales
  };

  const { msg } = alerta;
  return (
    <>
      <div className="w-full flex justify-center py-10">
        <div className="border-2 py-10 px-8 w-2/6 bg-slate-50 shadow-lg flex flex-col items-center rounded-md">
          <h1 className="font-bold text-2xl uppercase text-gray-600 mb-2">
            Iniciar Sesión
          </h1>
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <form
            onSubmit={handleSubmit}
            className="m-8 items-center flex flex-col justify-center"
          >
            <div>
              <div className="space-y-1">
                <label className="uppercase font-bold text-gray-600">
                  Documento:
                </label>
                <input
                  type="number"
                  className="w-full h-10 p-2 border-2 rounded-md focus:outline-green-500 focus:ring-green-500"
                  value={Id_User}
                  onChange={(e) => setId_User(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="uppercase font-bold text-gray-600">
                  Contraseña:
                </label>
                <input
                  type="password"
                  className="w-full h-10 p-2 border-2 rounded-md focus:outline-green-500 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 w-full py-2 px-6 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-600 md:w-auto mt-10"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
          <nav className="lg:flex lg:justify-between font-semibold">
            <Link
              to="/forgot-password"
              className="block text-center text-zinc-700 mx-2 hover:text-link hover:scale-105 transition-transform duration-200 ease-in-out hover:rounded-md"
            >
              Olvidé mi Contraseña
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Login;
