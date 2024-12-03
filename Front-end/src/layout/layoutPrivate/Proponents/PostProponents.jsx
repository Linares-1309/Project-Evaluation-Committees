/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createNewProponent, updateProponent } from "./ProponentsFunctions";
import Alerta from "../../../components/Alerta";
import { BsFillSendFill, BsTelephoneFill } from "react-icons/bs";
import { GoNumber } from "react-icons/go";
import {
  MdDriveFileRenameOutline,
  MdOutlineTextFields,
  MdEmail,
} from "react-icons/md";

const PostProponents = ({ proponentSelect, textButton, onSuccessUpdate }) => {
  const [idProponente, setIdProponente] = useState("");
  const [nombreProponente, setNombreProponente] = useState("");
  const [apellidoProponente, setApellidoProponente] = useState("");
  const [correoProponente, setCorreoProponente] = useState("");
  const [telefonoProponente, setTelefonoProponente] = useState("");

  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  // Registrar el nuevo proponente
  const { mutate, isLoading } = useMutation({
    mutationFn: createNewProponent,
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

  // Actualizar el proponente
  const {
    mutate: mutateUpdate,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useMutation({
    mutationFn: updateProponent,
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
    if (!idProponente || idProponente.length < 8) {
      setAlerta({
        msg: "El número de documento es muy corto, minimo 7 caracteres!",
        error: true,
      });
      return;
    }

    if (
      !nombreProponente ||
      !apellidoProponente ||
      !correoProponente ||
      !telefonoProponente
    ) {
      setAlerta({
        msg: "Los campos son obligatorios!",
        error: true,
      });
      return;
    }
    if (textButton === "Enviar") {
      const data = {
        idProponente,
        nombreProponente,
        apellidoProponente,
        correoProponente,
        telefonoProponente,
      };
      mutate(data);
    } else if (textButton === "Actualizar") {
      const { id_proponente } = proponentSelect;
      const data = {
        id_proponente,
        nombreProponente,
        apellidoProponente,
        correoProponente,
        telefonoProponente,
      };
      mutateUpdate(data);
    }
  };

  const setDataForm = () => {
    setIdProponente(proponentSelect?.id_proponente),
      setNombreProponente(proponentSelect?.nombres_proponente),
      setApellidoProponente(proponentSelect?.apellidos_proponente),
      setCorreoProponente(proponentSelect?.correo_proponente),
      setTelefonoProponente(proponentSelect?.telefono_proponente);
  };

  useEffect(() => {
    setDataForm();
  }, [proponentSelect]);

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
                  placeholder="Ej. 1107008534"
                  required
                  disabled={textButton === "Actualizar"}
                  value={idProponente}
                  onChange={(e) => setIdProponente(e?.target?.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
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
                    placeholder="Ingresa el nombre..."
                    required
                    value={nombreProponente}
                    onChange={(e) => setNombreProponente(e?.target?.value)}
                  />
                </div>
              </div>
              <div className="mb-3 w-full">
                <label
                  htmlFor="lastName"
                  className="block text-base font-medium text-gray-700 select-none text-start mb-1"
                >
                  Apellidos:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <MdOutlineTextFields size={22} className="text-gray-600" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Ingresa el apellido..."
                    required
                    value={apellidoProponente}
                    onChange={(e) => setApellidoProponente(e?.target?.value)}
                  />
                </div>
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
                  value={correoProponente}
                  onChange={(e) => setCorreoProponente(e?.target?.value)}
                />
              </div>
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="telephone"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Telefono:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <BsTelephoneFill size={16} className="text-gray-600" />
                </div>
                <input
                  type="number"
                  id="telephone"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Ingrese el numero de telefono..."
                  required
                  value={telefonoProponente}
                  onChange={(e) => setTelefonoProponente(e?.target?.value)}
                />
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

export default PostProponents;
