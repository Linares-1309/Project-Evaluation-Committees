/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyToken, newPassword } from "./UserFuctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import { Link, useParams } from "react-router-dom";

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
    <div className="w-full flex justify-center py-10">
      <div className="border-2 py-10 px-8 w-2/6 bg-slate-50 shadow-lg flex flex-col items-center rounded-md">
        <h1 className="font-bold text-2xl uppercase text-gray-600 mb-2">
          Actualizar Contraseña
        </h1>
        {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
        {tokenValido && (
          <form
            onSubmit={handleSubmit}
            className="m-8 items-center flex flex-col justify-center"
          >
            <div>
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
              <div className="space-y-1">
                <label className="uppercase font-bold text-gray-600">
                  Repetir Contraseña:
                </label>
                <input
                  type="password"
                  className="w-full h-10 p-2 border-2 rounded-md focus:outline-green-500 focus:ring-green-500"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 w-full py-2 px-6 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-green-600 md:w-auto mt-10"
              disabled={verifyLoading || newPassLoading}
            >
              {verifyLoading || newPassLoading
                ? "Cargando..."
                : "Actualizar Contraseña"}
            </button>
          </form>
        )}
        {passwordModificado && (
          <Link
            to="/login"
            className="block text-center my-5 text-zinc-950 mx-2 hover:text-link hover:scale-105 transition-transform duration-200 ease-in-out hover:rounded-md"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
