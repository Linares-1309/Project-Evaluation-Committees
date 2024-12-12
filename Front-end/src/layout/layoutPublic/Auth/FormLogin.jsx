/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./UserFuctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "./../../../hooks/useAuth.jsx";
import { FiUser } from "react-icons/fi";
import { MdOutlinePassword } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import ClientAxios from "../../../config/AxiosConfig.jsx";

const Login = () => {
  const [Id_User, setId_User] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth, setRoleUser } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Usamos useMutation para hacer la mutación de login
  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Si el login es exitoso, almacenamos el token
      const token = data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setRoleUser(decodedToken.rol);

      handleProfile();

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

      setAlerta({
        msg: error.message,
        error: true,
      });
    },
  });

  const handleProfile = async () => {
    const userProfile = await ClientAxios.get("/user/profile");
    setAuth(userProfile.data);
  };

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
      {/* <div className="flex justify-center p-14">
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
      </div> */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto py-24">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia Sesión con tu Cuenta
              </h1>
              {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="mb-3 w-full">
                  <label
                    htmlFor="document"
                    className="block text-base font-medium text-gray-700 select-none text-start mb-1"
                  >
                    Documento:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                      <FiUser size={18} className="text-gray-600" />
                    </div>
                    <input
                      type="number"
                      id="document"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                      placeholder="Ingrese el Documento de Identificación.."
                      required
                      value={Id_User}
                      onChange={(e) => setId_User(e?.target?.value)}
                      autoFocus
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3 w-full">
                    <label
                      htmlFor="password"
                      className="block text-base font-medium text-gray-700 select-none text-start mb-1"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <MdOutlinePassword
                          size={18}
                          className="text-gray-600"
                        />
                      </div>
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder="Ingresa la contraseña..."
                        required
                        value={password}
                        onChange={(e) => setPassword(e?.target?.value)}
                        autoComplete="off"
                      />
                      <span
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                        onClick={togglePasswordVisibility} // Alterna la visibilidad de la contraseña
                      >
                        {isPasswordVisible ? (
                          // Icono de ojo abierto (contraseña visible)
                          <AiFillEye size={20} />
                        ) : (
                          // Icono de ojo cerrado (contraseña oculta)
                          <AiFillEyeInvisible size={20} />
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  {/* <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-500 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300 select-none"
                      >
                        Remember me
                      </label>
                    </div>
                  </div> */}
                  <Link
                    to="/forgot-password"
                    className="font-RobotoSlab text-sm font-medium text-green-500 hover:underline dark:text-green-400"
                  >
                    ¿Olvidó su Contraseña?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 font-RobotoSlab "
                >
                  Iniciar Sesion
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
