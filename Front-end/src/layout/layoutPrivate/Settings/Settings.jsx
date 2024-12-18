/* eslint-disable react-hooks/exhaustive-deps */
// Iconos de componente
import { BsPersonFill } from "react-icons/bs";
import {
  MdOutlinePhone,
  MdEmail,
  MdDriveFileRenameOutline,
} from "react-icons/md";
import { FaUpload } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";

// Librerias
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";

// Componentes
import { updateUser, updateImageUser } from "../Users/UsersFunctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import GetUser from "../Users/GetUser.jsx";
import useAuth from "../../../hooks/useAuth.jsx";

const URI_FOTOS = import.meta.env.VITE_FOTOS_URL;

const Settings = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userBiography, setUserBiography] = useState("");
  const [userPotho, setUserPotho] = useState();
  const inputFoto = useRef(null);

  const [alerta, setAlerta] = useState({});

  const { auth, updateAvatar } = useAuth();

  const setDataUserForm = () => {
    setFullName(auth?.user?.fullName);
    setUserName(auth?.user?.username);
    setPhoneNumber(auth?.user?.phoneNumber);
    setEmail(auth?.user?.email);
    setUserBiography(auth?.user?.userBiography);
    setUserPotho(auth?.user?.userPotho);
  };
  // Actualizar el usuario
  const { mutate } = useMutation({
    mutationFn: updateUser,
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

  // Actualizar la foto del usuario
  const { mutate: mutateUpdateImage } = useMutation({
    mutationFn: updateImageUser,
    onSuccess: (data) => {
      if (data.user) {
        updateAvatar(data.user.userPotho);
      }
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

  useEffect(() => {
    setDataUserForm();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      fullName === auth?.user?.fullName &&
      userName === auth?.user?.username &&
      phoneNumber === auth?.user?.phoneNumber &&
      email === auth?.user?.email &&
      userBiography === auth?.user?.userBiography
    ) {
      setAlerta({
        msg: "Los datos no han cambiado!",
        error: true,
      });
      return;
    }
    const data = {
      Id_User: auth?.user?.Id_User,
      fullName,
      username: userName,
      phoneNumber,
      email,
      userBiography,
    };
    mutate(data);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserPotho(file); // Guardar el archivo en el estado
    } else {
      console.error("No se seleccionó ningún archivo");
    }
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!userPotho) {
      setAlerta({
        msg: "Por favor, selecciona una imagen antes de continuar.",
        error: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("userPotho", userPotho); // Nombre clave que coincide con multer

    const Id_User = auth?.user?.Id_User;

    if (!Id_User) {
      setAlerta({
        msg: "Usuario no encontrado. Por favor, inicia sesión nuevamente.",
        error: true,
      });
      return;
    }

    mutateUpdateImage({ formData, Id_User });
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <h1 className="mb-2 text-2xl font-semibold text-black text-start font-RobotoSlab">
          Ajustes de <span className="text-green-500">Cuenta</span>
        </h1>
        <div className="px-40 mb-4">
          {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
        </div>
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="bg-white border border-gray-100 rounded-xl shadow-default dark:border-gray-900 dark:bg-gray-950">
              <div className="py-4 border-b border-gray-200 px-7 dark:border-gray-100">
                <h3 className="font-medium text-black text-start dark:text-white">
                  Información Personal
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6 mb-4 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="block text-start mb-2 text-base font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Nombre Completo
                      </label>
                      <div className="relative">
                        <span className="absolute ps-3 top-3.5">
                          <BsPersonFill color="green" />
                        </span>
                        <input
                          className="w-full py-2 pr-5 text-black border rounded bg-gray-50 focus:border-green-500 focus-visible:outline-none ps-8 focus:ring-1 focus:ring-green-500"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Ingrese su Nombre..."
                          value={fullName}
                          onChange={(e) => setFullName(e?.target?.value)}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="block text-start mb-2 text-base font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Telefono
                      </label>
                      <div className="relative">
                        <span className="absolute ps-3 top-3.5">
                          <MdOutlinePhone color="green" />
                        </span>
                        <input
                          className="w-full py-2 pr-5 text-black border rounded bg-gray-50 focus:border-green-500 focus-visible:outline-none ps-8 focus:ring-1 focus:ring-green-500"
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="Ingrese su Numero..."
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e?.target?.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-start mb-2 text-base font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Correo Electroníco
                    </label>
                    <div className="relative">
                      <span className="absolute ps-3 top-3.5">
                        <MdEmail color="green" />
                      </span>
                      <input
                        className="w-full py-2 pr-5 text-black border rounded bg-gray-50 focus:border-green-500 focus-visible:outline-none ps-8 focus:ring-1 focus:ring-green-500"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="correo@example.com"
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-start mb-2 text-base font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Nombre de Usuario
                    </label>
                    <div className="relative">
                      <span className="absolute ps-3 top-3.5">
                        <MdDriveFileRenameOutline color="green" />
                      </span>
                      <input
                        className="w-full py-2 pr-5 text-black border rounded bg-gray-50 focus:border-green-500 focus-visible:outline-none ps-8 focus:ring-1 focus:ring-green-500"
                        type="text"
                        name="Username"
                        id="Username"
                        placeholder="Ingresa un Nombre de Usuario..."
                        value={userName}
                        onChange={(e) => setUserName(e?.target?.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="block text-start mb-2 text-base font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Biografía
                    </label>
                    <div className="relative">
                      <span className="absolute ps-3 top-3.5">
                        <TfiWrite color="green" />
                      </span>

                      <textarea
                        className="w-full py-2 pr-9 text-black border rounded bg-gray-50 focus:border-green-500 focus-visible:outline-none ps-9 focus:ring-1 focus:ring-green-500 text-sm"
                        name="bio"
                        id="bio"
                        rows={5}
                        placeholder="Aquí puedes escribir tu biorafía..."
                        value={userBiography}
                        onChange={(e) => setUserBiography(e?.target?.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="px-9 py-3 rounded-2xl bg-green-500 font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-green-400 transition-colors duration-200 mt-3">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2 ">
            <div className="bg-white border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-xl">
              <div className="py-4 border-b border-stroke px-7 dark:border-strokedark">
                <h3 className=" text-start font-medium text-black dark:text-white">
                  Foto de Perfil
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmitFile}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full h-14 w-14">
                      <img
                        width="80px"
                        src={`${URI_FOTOS}${auth?.user?.userPotho}`}
                        alt="No Foto"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Editar Foto
                      </span>
                      <span className="flex gap-2.5">
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:underline"
                        >
                          Borrar
                        </button>
                        {/* <button
                          type="button"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Actualizar
                        </button> */}
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded-xl border border-dashed border-gray-400 bg-gray-50 py-4 px-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                      ref={inputFoto}
                      onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span>
                        <FaUpload color="green" size={24} />
                      </span>
                      <p>
                        <span className="text-primary">
                          Haga click para cargar
                        </span>{" "}
                        o arrastre y suelte un archivo..
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                    </div>
                  </div>

                  <div className="flex justify-end ">
                    <button
                      className="px-5 py-2 rounded-2xl bg-green-500 font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-green-400 transition-colors duration-400 mt-3 text-xs"
                      type="submit"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GetUser />
    </>
  );
};

export default Settings;
