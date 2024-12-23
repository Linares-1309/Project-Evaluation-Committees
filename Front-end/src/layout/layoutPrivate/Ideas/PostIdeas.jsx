/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// Componentes
import { BsFillSendFill } from "react-icons/bs";
import { MdNumbers } from "react-icons/md";
import { CiTextAlignCenter } from "react-icons/ci";

// Librerias
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Componentes
import { createNewIdea, updateIdea } from "./IdeasFunctions.jsx";
import { getAllProponents } from "../Proponents/ProponentsFunctions.jsx";
import Alerta from "../../../components/Alerta.jsx";

// Componente para crear una nueva idea
const PostIdeas = ({
  ideaSelect,
  textButton,
  onSuccessSave,
  setTextButton,
  setSelectedIdEdit,
}) => {
  // State para el formulario
  const [idIdea, setIdIdea] = useState("");
  const [nombreIdea, setNombreIdea] = useState("");
  const [descripcionIdea, setDescripcionIdea] = useState("");
  const [idProponente, setIdProponente] = useState("");

  // State para la alerta
  const [alerta, setAlerta] = useState({});
  const [selectedIdea, setSelectedIdea] = useState(null);

  // State para almacenar los proponentes
  const [proponentes, setProponentes] = useState([]);

  // Traer todos los proponenetes para registrar la idea
  const {
    data,
    error,
    isError,
    isLoading: loading,
  } = useQuery({
    queryKey: ["proponents-for-ideas"],
    queryFn: getAllProponents,
  });

  // Almacena los proponentes
  useEffect(() => {
    if (loading) {
      setAlerta({
        msg: "Cargando...",
        error: false,
      });
    } else if (isError) {
      setAlerta({
        msg: error?.message || "Hubo un error",
        error: true,
      });
    } else {
      setAlerta({});
      setProponentes(data);
    }
  }, [loading, isError, error, data]);

  // Enviar la data al form para actualizar
  const setDataForm = () => {
    setIdIdea(ideaSelect?.id_idea);
    setNombreIdea(ideaSelect?.nom_idea);
    setDescripcionIdea(ideaSelect?.des_idea);
    setIdProponente(ideaSelect?.id_proponente);
    const selected = dataProponents.find(
      (proponent) => proponent?.id_proponente === ideaSelect?.id_proponente
    );
    setSelectedIdea(selected || null);
  };

  // Setea los datos del formulario a la hora de editar
  useEffect(() => {
    setDataForm();
  }, [ideaSelect]);

  // Limpia el formulario
  const clearForm = () => {
    setIdIdea("");
    setNombreIdea("");
    setDescripcionIdea("");
    setIdProponente("");
  };

  // Crear la nueva idea
  const { mutate, isLoading } = useMutation({
    mutationFn: createNewIdea,
    onSuccess: (data) => {
      onSuccessSave();
      clearForm();
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

  // Actualiza la idea existente
  const { mutate: mutateUpdate } = useMutation({
    mutationFn: updateIdea,
    onSuccess: (data) => {
      onSuccessSave();
      setTextButton("Enviar");
      setSelectedIdEdit(null);
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        clearForm(); // Limpia el formulario
      }, 0);
    },
    onError: (error) => {
      setAlerta({
        msg: error.message,
        error: true,
      });
    },
  });

  // Maneja el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idIdea || !nombreIdea || !descripcionIdea || !idProponente) {
      setAlerta({
        msg: "Los campos son obligatorios!",
        error: true,
      });
      return;
    }
    if (textButton === "Enviar") {
      const data = { idIdea, nombreIdea, descripcionIdea, idProponente };
      mutate(data);
    } else if (textButton === "Actualizar") {
      const { id_idea } = ideaSelect;
      const data = { id_idea, nombreIdea, descripcionIdea, idProponente };
      mutateUpdate(data);
    }
  };

  // Almacena los proponentes
  const dataProponents = proponentes?.proponents || [];

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
                htmlFor="codeIdea"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Codigo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <MdNumbers size={22} className="text-gray-700" />
                </div>
                <input
                  type="text"
                  id="codeIdea"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500`}
                  placeholder="Ingrese el nombre de la idea..."
                  required
                  value={idIdea}
                  onChange={(e) => setIdIdea(e?.target?.value)}
                />
              </div>
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="nameIdea"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Nombre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <CiTextAlignCenter size={22} className="text-gray-700" />
                </div>
                <input
                  type="text"
                  id="nameIdea"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500`}
                  placeholder="Ingrese el nombre de la idea..."
                  required
                  value={nombreIdea}
                  onChange={(e) => setNombreIdea(e?.target?.value)}
                />
              </div>
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="description"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Descripción
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Escribe la descripcion del criterio..."
                  value={descripcionIdea}
                  onChange={(e) => setDescripcionIdea(e?.target?.value)}
                ></textarea>
              </div>
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="proponents"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Proponente
              </label>
              <div className="relative">
                <select
                  id="proponents"
                  value={idProponente}
                  onChange={(e) => setIdProponente(e.target.value)}
                  className="w-full p-2 placeholder-gray-400 rounded-md focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Seleccione un Proponente de la Idea:</option>
                  {dataProponents.map((proponent) => (
                    <option
                      key={proponent?.id_proponente}
                      value={proponent?.id_proponente}
                    >
                      {`${proponent?.nombres_proponente} ${" "} 
                          ${proponent?.apellidos_proponente}`}
                    </option>
                  ))}
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

export default PostIdeas;
