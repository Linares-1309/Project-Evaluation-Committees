/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Iconos del componente
import { BsFillSendFill } from "react-icons/bs";

// Librerias
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Componentes
import { createCriteria, updateCriteria } from "./CriteriaFunctions.jsx";
import { getAllSetOfCriteria } from "../SetOfCriteria/SetOfCriteriaFunctions.jsx";
import Alerta from "../../../components/Alerta.jsx";

const PostCriteria = ({
  criteriaSelect,
  textButton,
  onSuccessSave,
  setTextButton,
  setSelectedIdEdit,
}) => {
  // State para el formulario
  const [desCriterio, setDesCriterio] = useState("");
  const [idConjuntoCriterios, setIdConjuntoCriterios] = useState("");

  // State para la alerta
  const [alerta, setAlerta] = useState({});
  const [selectedSetOfCriteria, setSelectedSetOfCriteria] = useState(null);

  // State para almacenar los conjuntos de criterios
  const [conjuntoCriterios, setConjuntoCriterios] = useState([]);

  // Trae todos los conjuntos de criterios
  const {
    data,
    error,
    isError,
    isLoading: loading,
  } = useQuery({
    queryKey: ["conjunto-criterios-for-criteria"],
    queryFn: getAllSetOfCriteria,
  });

  // Almacena los conjuntos de criterios
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
      setConjuntoCriterios(data);
    }
  }, [loading, isError, error, data]);

  // Setea los datos del formulario a la hora de editar
  const setDataForm = () => {
    setDesCriterio(criteriaSelect.des_criterio);
    setIdConjuntoCriterios(criteriaSelect.id_conjunto_criterio);
    const selected = setOfCriteria.find(
      (conjunto) =>
        conjunto.id_conjunto_criterio === criteriaSelect.id_conjunto_criterio
    );
    setSelectedSetOfCriteria(selected || null);
  };

  useEffect(() => {
    setDataForm();
  }, [criteriaSelect]);

  // Limpia el formulario
  const clearForm = () => {
    setDesCriterio("");
    setIdConjuntoCriterios("");
  };

  // Crea el NUEVO criterio
  const { mutate, isLoading } = useMutation({
    mutationFn: createCriteria,
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

  // Actualiza el criterio EXISTENTE
  const {
    mutate: mutateUpdate,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useMutation({
    mutationFn: updateCriteria,
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
    if (desCriterio.length < 10) {
      setAlerta({
        msg: "El campo no puede estar vacio o con pocos caracteres!",
        error: true,
      });
      return;
    }
    if (textButton === "Enviar") {
      const data = { desCriterio, idConjuntoCriterios };
      mutate(data);
    } else if (textButton === "Actualizar") {
      if (
        desCriterio === criteriaSelect?.des_criterio &&
        idConjuntoCriterios === criteriaSelect?.id_conjunto_criterio
      ) {
        setAlerta({
          msg: "No se puede actualizar por que los datos no han cambiado!",
          error: true,
        });
        return;
      }
      const id_criterio = criteriaSelect.id_criterio;
      const data = { id_criterio, desCriterio, idConjuntoCriterios };
      mutateUpdate(data);
    }
  };

  // Almacena los conjuntos de criterios
  const setOfCriteria = conjuntoCriterios.setOfCriteria || [];

  // Render
  return (
    <>
      <div className="flex justify-center">
        <div className="py-5 flex flex-col items-center space-y-4">
          {alerta?.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <form
            className="max-w-sm mx-auto flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-3 w-full">
              <label
                htmlFor="message"
                className="block text-base font-medium text-gray-700 select-none text-start mb-1"
              >
                Descripcion del Criterio
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Escribe la descripcion del criterio..."
                  value={desCriterio}
                  onChange={(e) => setDesCriterio(e?.target?.value)}
                ></textarea>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-base font-medium text-gray-700 select-none text-start mb-1">
                Conjunto de Criterios
              </label>
              <select
                id="idConjuntoCriterios"
                value={idConjuntoCriterios}
                onChange={(e) => setIdConjuntoCriterios(e.target.value)}
                className="w-full p-2 placeholder-gray-400 rounded-md focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Seleccione un Conjunto de Criterios:</option>
                {setOfCriteria.map((conjuntoCriterios) => (
                  <option
                    key={conjuntoCriterios.id_conjunto_criterio}
                    value={conjuntoCriterios.id_conjunto_criterio}
                  >
                    {conjuntoCriterios.des_conjunto_criterio}
                  </option>
                ))}
              </select>
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

export default PostCriteria;
