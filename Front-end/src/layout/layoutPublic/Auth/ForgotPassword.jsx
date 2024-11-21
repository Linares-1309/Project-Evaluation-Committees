/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "./UserFuctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import { Link } from "react-router-dom";

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
              <div className="space-y-1">
                <label className="uppercase font-bold text-gray-600">
                  Correo de Recuperacion:
                </label>
                <input
                  type="email"
                  className="w-full h-10 p-2 border-2 rounded-md focus:outline-green-500 focus:ring-green-500"
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
