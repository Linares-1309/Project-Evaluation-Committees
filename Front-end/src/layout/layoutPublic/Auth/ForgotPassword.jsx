/* eslint-disable no-unused-vars */

// Iconos
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

// Librerias
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

// Conponenentes y funciones
import { forgotPassword } from "./UserFuctions.jsx";
import Alerta from "../../../components/Alerta.jsx";

// Componente de Recuperar Contraseña
const ForgotPassword = () => {
  // State para el formulario
  const [email, setEmail] = useState("");

  // State para las alertas
  const [alerta, setAlerta] = useState({});

  // Mutación para recuperar contraseña
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setEmail("");
    },
    onError: (error) => {
      setAlerta({
        msg: error.message,
        error: true,
      });
    },
  });

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email].includes("")) {
      setAlerta({
        msg: "No pueden haber campos vacios!",
        error: true,
      });
      return;
    }
    mutate(email);
  };

  // Extraemos la alerta
  const { msg } = alerta;

  // Retornamos el formulario
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto py-20">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Recuperar Contraseña
              </h1>
              {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="mb-3 w-full">
                  <label
                    htmlFor="email"
                    className="block text-base font-medium text-gray-700 select-none text-start mb-1"
                  >
                    Correo Electronico:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                      <MdEmail size={18} className="text-gray-600" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                      placeholder="example@gmail.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e?.target?.value)}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Link
                    to="/login"
                    className="font-RobotoSlab text-sm font-medium text-green-500 hover:underline dark:text-green-400"
                  >
                    ¿Tienes una Cuenta? Inicia Sesion
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 font-RobotoSlab"
                >
                  {isLoading ? "Cargando..." : "Recuperar Contraseña"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
