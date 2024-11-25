/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "./UserFuctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setEmail("")
    },
    onError: (error) => {
      setAlerta({
        msg: error.message,
        error: true,
      });
    },
  });

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
  const { msg } = alerta;
  return (
    <>
      <div className="w-full flex justify-center py-10">
        <div className="border-2 py-10 px-8 w-2/6 bg-slate-50 shadow-lg flex flex-col items-center rounded-md">
          <h1 className="font-bold text-2xl uppercase text-gray-600 mb-2">
            Recuperar Contraseña
          </h1>
          {msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <form
            onSubmit={handleSubmit}
            className="m-8 items-center flex flex-col justify-center"
          >
            <div>
              <label
                htmlFor="website-admin-document"
                className="block mb-1 text-base font-medium text-gray-900 dark:text-white text-start"
              >
                Correo Electronico
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <MdEmail size={16} />
                </span>
                <input
                  type="email"
                  id="website-admin-document"
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Ej. tecnoparque@sena.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 w-full py-2 px-6 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-600 md:w-auto mt-10"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Recuperar Contraseña"}
            </button>
          </form>
          <nav className="lg:flex lg:justify-between font-semibold">
            <Link
              to="/login"
              className="block text-center text-zinc-700 mx-2 hover:text-link hover:scale-105 transition-transform duration-200 ease-in-out hover:rounded-md"
            >
              ¿Tienes una Cuenta? Inicia Sesion
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
