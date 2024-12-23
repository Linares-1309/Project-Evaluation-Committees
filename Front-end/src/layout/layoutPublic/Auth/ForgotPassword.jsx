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
      setEmail("");
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
      {/* <div className="w-full flex justify-center py-10">
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
      </div> */}

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto py-24">
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
