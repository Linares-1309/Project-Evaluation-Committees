/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyToken, newPassword } from "./UserFuctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import { Link, useParams } from "react-router-dom";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  // Verificación de token
  const {
    mutate: verify_Token,
    isLoading: verifyLoading,
    isError: verifyError,
    error: verifyErrorMsg,
  } = useMutation({
    mutationFn: verifyToken,
    onSuccess: (data) => {
      setTokenValido(true);
      setAlerta({
        msg: data.msg,
        error: false,
      });
    },
    onError: (error) => {
      setAlerta({
        msg: error.message,
        error: true,
      });
    },
  });

  // Cambio de contraseña
  const { mutate: newPass, isLoading: newPassLoading } = useMutation({
    mutationFn: newPassword,
    onSuccess: (data) => {
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
    },
    onError: (error) => {
      setAlerta({
        msg: error.message,
        error: true,
      });
    },
  });

  useEffect(() => {
    // Verificamos el token al montar el componente
    verify_Token(token);
  }, [token, verify_Token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de las contraseñas
    if (password !== passwordRepeat) {
      setAlerta({ msg: "Las contraseñas no coinciden!", error: true });
      return;
    }
    if (password.length < 8) {
      setAlerta({
        msg: "Las contraseñas son muy cortas, mínimo 8 caracteres!",
        error: true,
      });
      return;
    }

    // Llamada a la mutación para cambiar la contraseña
    newPass({ token, password });
  };

  return (
    <>
      <div className="flex justify-center p-14">
        <div className="border-2 py-10 px-8 w-3/12 bg-slate-50 shadow-lg flex flex-col items-center rounded-md">
          <h1 className="font-bold text-2xl uppercase text-gray-600 mb-2">
            Actualizar Contraseña
          </h1>
          {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <form
            className="max-w-sm mx-auto flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-2">
              <label
                htmlFor="website-admin-password"
                className="block mb-1 text-base font-medium text-gray-900 dark:text-white text-start"
              >
                Contraseña
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <RiLockPasswordLine className="text-gray-600" size={14} />
                </span>
                <input
                  type="password"
                  id="website-admin-password"
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Ingrese la contraseña!"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="website-admin-password-repeat"
                className="block mb-1 text-base font-medium text-gray-900 dark:text-white text-start"
              >
                Repita la Contraseña
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <RiLockPasswordFill className="text-gray-600" size={14} />
                </span>
                <input
                  type="password"
                  id="website-admin-password-repeat"
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Ingrese su contraseña"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 w-full py-2 px-6 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-600 md:w-auto"
              disabled={verifyLoading}
            >
              {verifyLoading ? "Cargando..." : "Guardar Contraseña"}
            </button>
          </form>
          {passwordModificado && (
            <nav className="lg:flex lg:justify-between font-semibold mt-5">
              <Link
                to="/login"
                className="block text-center text-zinc-700 mx-2 hover:text-link hover:scale-105 transition-transform duration-200 ease-in-out hover:rounded-md"
              >
                Iniciar Sesión
              </Link>
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

export default NewPassword;
