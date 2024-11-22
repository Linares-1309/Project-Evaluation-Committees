import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./UserFuctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "./../../../hooks/useAuth.jsx";
import { FiUser } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";

const Login = () => {
  const [Id_User, setId_User] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  // Usamos useMutation para hacer la mutación de login
  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Si el login es exitoso, almacenamos el token
      localStorage.setItem("token", data.token);
      setAuth(data);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      const timer = setTimeout(() => {
      navigate("/admin");

      }, 2000);

      return () => clearTimeout(timer);
    },
    onError: (error) => {
      // Limpiar el localStorage
      localStorage.removeItem("token");
      localStorage.clear();
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
              <div className="relative mb-4">
                <input
                  type="text"
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500 peer pl-8"
                  placeholder=" "
                  value={Id_User}
                  onChange={(e) => setId_User(e.target.value)}
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 select-none"
                >
                  Documento
                </label>
                <div className="absolute left-3 top-1/2 transform -translate-y-1">
                  <FiUser className="text-gray-600" size={14} />
                </div>
              </div>
              <div className="relative ">
                <input
                  type="text"
                  id="floating_outlined"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500 peer pl-8"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1  select-none"
                >
                  Contraseña
                </label>
                <div className="absolute left-3 top-1/2 transform -translate-y-1">
                  <MdOutlinePassword className="text-gray-600" size={14} />
                </div>
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
