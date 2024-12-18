/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  createNewSetOfCriteria,
  updateSetOfCriteria,
} from "./SetOfCriteriaFunctions";
import Alerta from "../../../components/Alerta";
import { BsFillSendFill } from "react-icons/bs";

const PostSetOfCriteria = ({
  onSuccessSave,
  setOfCriteriaSelect,
  textButton,
  setTextButton,
  setSelectedIdEdit
}) => {
  const [desConjuntoCriterios, setDesConjuntoCriterios] = useState("");
  const [alerta, setAlerta] = useState({});

  const setDataForm = () => {
    setDesConjuntoCriterios(setOfCriteriaSelect?.des_conjunto_criterio || "");
  };
  useEffect(() => {
    setDataForm();
  }, [setOfCriteriaSelect]);

  const clearForm = () => {
    setDesConjuntoCriterios("");
  };

  // Crear nuevo vonjunto de criterios
  const { mutate, isLoading } = useMutation({
    mutationFn: createNewSetOfCriteria,
    onSuccess: (data) => {
      onSuccessSave();
      clearForm();
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setDesConjuntoCriterios("");
    },
    onError: (error) => {
      setAlerta({
        msg: error.message,
        error: true,
      });
    },
  });

  // Actualizar elconjunto de criterios EXISTENTE
  const {
    mutate: mutateUpdate,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useMutation({
    mutationFn: updateSetOfCriteria,
    onSuccess: (data) => {
      onSuccessSave();
      setTextButton("Enviar");
      setSelectedIdEdit(null)
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        clearForm(); // O asegúrate de que esta función maneje el estado correctamente
      }, 0);
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
    if (desConjuntoCriterios.length < 10) {
      setAlerta({
        msg: "El Campo no puede ir vacio o con pocos caracteres!",
        error: true,
      });
      return;
    }
    if (textButton === "Enviar") {
      const data = { desConjuntoCriterios };
      mutate(data);
    } else if (textButton === "Actualizar") {
      if (desConjuntoCriterios === setOfCriteriaSelect.des_conjunto_criterio) {
        setAlerta({
          msg: "No se puede actualizar por que los datos no han cambiado!",
          error: true,
        });
        return;
      }
      const id_conjunto_criterio = setOfCriteriaSelect.id_conjunto_criterio;
      const data = { id_conjunto_criterio, desConjuntoCriterios };
      mutateUpdate(data);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="py-5 flex flex-col items-center space-y-4">
          {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
          <form
            className="max-w-sm mx-auto flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <label
                htmlFor="message"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-start select-none"
              >
                Descripcion del Conjunto de Criterios
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Escribe la descripcion del conjunto de criterios..."
                  value={desConjuntoCriterios}
                  onChange={(e) => setDesConjuntoCriterios(e.target.value)}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white uppercase bg-gradient-to-r from-green-300 via-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center justify-center"
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

export default PostSetOfCriteria;
