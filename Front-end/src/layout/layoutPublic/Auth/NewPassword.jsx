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
      {/* <div className="flex justify-center p-14">
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
      </div> */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto py-24">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Actualizar Contraseña
              </h1>
              {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                        <RiLockPasswordLine
                          size={18}
                          className="text-gray-600"
                        />
                      </div>
                      <input
                      type="password"
                        // type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder="Ingresa la contraseña..."
                        required
                        value={password}
                        onChange={(e) => setPassword(e?.target?.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="mb-3 w-full">
                    <label
                      htmlFor="password"
                      className="block text-base font-medium text-gray-700 select-none text-start mb-1"
                    >
                      Repita la Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <RiLockPasswordLine
                          size={18}
                          className="text-gray-600"
                        />
                      </div>
                      <input
                        // type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder=" Repita la Contraseña..."
                        required
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e?.target?.value)}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                {passwordModificado && (
                  <div className="flex items-center justify-end">
                    <Link
                      to="/forgot-password"
                      className="font-RobotoSlab text-sm font-medium text-green-500 hover:underline dark:text-green-400"
                    >
                      Iniciar Sesión
                    </Link>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 font-RobotoSlab "
                >
                  {verifyLoading ? "Cargando..." : "Guardar Contraseña"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewPassword;
