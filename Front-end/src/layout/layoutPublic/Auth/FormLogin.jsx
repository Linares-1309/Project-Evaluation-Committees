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
      }, 1000);

      return () => clearTimeout(timer);
    },
    onError: (error) => {
      // Limpiar el localStorage
      localStorage.removeItem("token");
      localStorage.clear();

      // Si ocurre un error, mostramos el mensaje de error
      setAlerta({
        msg: error.message, // El mensaje es extraído del error lanzado
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
      <div className="flex justify-center p-14">
        <div className="border-2 py-10 px-8 w-3/12 bg-slate-50 shadow-lg flex flex-col items-center rounded-md">
          <h1 className="font-bold text-2xl uppercase text-gray-600 mb-2">
            Iniciar Sesión
          </h1>
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <form
            className="max-w-sm mx-auto flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-2">
              <label
                htmlFor="website-admin-document"
                className="block mb-1 text-base font-medium text-gray-900 dark:text-white text-start"
              >
                Documento
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <FiUser className="text-gray-600" size={14} />
                </span>
                <input
                  type="text"
                  id="website-admin-document"
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Ej. 1107008523"
                  value={Id_User}
                  onChange={(e) => setId_User(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="website-admin-password"
                className="block mb-1 text-base font-medium text-gray-900 dark:text-white text-start"
              >
                Contraseña
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <MdOutlinePassword className="text-gray-600" size={14} />
                </span>
                <input
                  type="password"
                  id="website-admin-password"
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 w-full py-2 px-6 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-600 md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
          <nav className="lg:flex lg:justify-between font-semibold mt-5">
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
