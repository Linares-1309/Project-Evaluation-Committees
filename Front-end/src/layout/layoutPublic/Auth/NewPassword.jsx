/* eslint-disable no-unused-vars */

// Icons
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// Libraries
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

// Components and Functions
import { verifyToken, newPassword } from "./UserFuctions.jsx";
import Alerta from "../../../components/Alerta.jsx";

// Component of New Password
const NewPassword = () => {
  // States for the form
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  // States for the alert
  const [alerta, setAlerta] = useState({});

  // States for the verification of the token and the password modification
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  // States for the visibility of the password
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(false);

  // Function to toggle the visibility of the password
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePasswordRepeatVisibility = () => {
    setIsPasswordRepeatVisible(!isPasswordRepeatVisible);
  };

  // Hook for the parameters
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

  // Función para manejar el envío del formulario
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
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto py-20">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Actualizar Contraseña
              </h1>
              {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <div className="mb-2 w-full">
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
                        type={isPasswordRepeatVisible ? "text" : "password"}
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
                        onClick={togglePasswordRepeatVisibility} // Alterna la visibilidad de la contraseña
                      >
                        {isPasswordRepeatVisible ? (
                          // Icono de ojo abierto (contraseña visible)
                          <AiFillEye size={20} />
                        ) : (
                          // Icono de ojo cerrado (contraseña oculta)
                          <AiFillEyeInvisible size={20} />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mb-2 w-full">
                    <label
                      htmlFor="password"
                      className="block text-base font-medium text-gray-700 select-none text-start mb-1"
                    >
                      Repita la Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <RiLockPasswordFill
                          size={18}
                          className="text-gray-600"
                        />
                      </div>
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                        placeholder=" Repita la Contraseña..."
                        required
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e?.target?.value)}
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
