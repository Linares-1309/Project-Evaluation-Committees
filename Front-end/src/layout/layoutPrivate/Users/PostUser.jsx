/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createUser, updateUser } from "./UsersFunctions";
import Alerta from "../../../components/Alerta";
import { GoNumber } from "react-icons/go";
import {
  MdDriveFileRenameOutline,
  MdEmail,
  MdOutlinePassword,
} from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";

const PostUser = ({ userSelect, textButton, onSuccessUpdate }) => {
  const [idUser, setIdUser] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [userType, setUserType] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordRepeatVisible, setIsPasswordRepeatVisible] = useState(false);

  const [alerta, setAlerta] = useState({});

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePasswordRepeatVisibility = () => {
    setIsPasswordRepeatVisible(!isPasswordRepeatVisible);
  };

  // Registrar el nuevo usuario
  const { mutate, isLoading } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
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

  // Actualizar el usuario
  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      onSuccessUpdate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setAlerta({
        msg: "Las contraseñas no coinciden!",
        error: true,
      });
      return
    }
    if (!idUser || idUser.length < 8) {
      setAlerta({
        msg: "El número de documento es muy corto, minimo 7 caracteres!",
        error: true,
      });
      return;
    }

    if (!userName || !email || !userType || !password) {
      setAlerta({
        msg: "Los campos son obligatorios!",
        error: true,
      });
      return;
    }
    if (textButton === "Enviar") {
      const data = {
        idUser,
        userName,
        email,
        password,
        userType,
      };
      mutate(data);
    } else if (textButton === "Actualizar") {
      const { idUser } = userSelect;
      const data = {
        idUser,
        userName,
        email,
        userType,
      };
      mutateUpdate(data);
    }
  };
  const setDataForm = () => {
    setIdUser(userSelect?.Id_User),
      setUserName(userSelect?.username),
      setEmail(userSelect?.email),
      setUserType(userSelect?.userType);
  };

  useEffect(() => {
    setDataForm();
  }, [userSelect]);

  return (
    <>
      <div className="flex justify-center">
        <div className="py-5 flex flex-col items-center space-y-4 w-full">
          {alerta?.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}

          <form
            className="w-full px-12 mx-auto flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 w-full">
              <label
                htmlFor="document"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Documento:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <GoNumber size={22} className="text-gray-600" />
                </div>
                <input
                  type="number"
                  id="document"
                  className={
                    textButton === "Actualizar"
                      ? `ps-10 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-green-500 dark:focus:border-green-500 shadow`
                      : `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500`
                  }
                  placeholder="Ingrese el Documento de Identificación.."
                  required
                  disabled={textButton === "Actualizar"}
                  value={idUser}
                  onChange={(e) => setIdUser(e?.target?.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Nombres:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <MdDriveFileRenameOutline
                    size={18}
                    className="text-gray-600"
                  />
                </div>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Ingresa Nombres y Apellidos..."
                  required
                  value={userName}
                  onChange={(e) => setUserName(e?.target?.value)}
                />
              </div>
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Correo:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <MdEmail size={18} className="text-gray-600" />
                </div>
                <input
                  type="email"
                  id="email"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="example@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <MdOutlinePassword size={18} className="text-gray-600" />
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
            <div className="mb-3 w-full">
              <label
                htmlFor="repeatPassword"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Repita la Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <MdOutlinePassword size={18} className="text-gray-600" />
                </div>
                <input
                  type={isPasswordRepeatVisible ? "text" : "password"}
                  id="repeatPassword"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Repita la Contraseña..."
                  required
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e?.target?.value)}
                  autoComplete="off"
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer select-none"
                  onClick={togglePasswordRepeatVisibility} // Alterna la visibilidad de la contraseña
                >
                  {isPasswordRepeatVisible ? (
                    // Icono de ojo abierto (contraseña visible)
                    <AiFillEye size={20} className="text-gray-600" />
                  ) : (
                    // Icono de ojo cerrado (contraseña oculta)
                    <AiFillEyeInvisible size={20} className="text-gray-600" />
                  )}
                </span>
              </div>
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="telephone"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Tipo de Usuario
              </label>
              <div className="relative">
                <select
                  id="idConjuntoCriterios"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full p-2 placeholder-gray-400 rounded-md focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Seleccione el Tipo de Usuario:</option>
                  <option value="Admin">Admin</option>
                  <option value="Calificador">Calificador</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="text-white uppercase bg-gradient-to-r from-green-300 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center justify-center mt-4"
              disabled={isLoading}
            >
              <BsFillSendFill size={15} className="mr-2" />
              {textButton}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostUser;
