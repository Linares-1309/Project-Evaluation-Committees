/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createRubrics, updateRubrics } from "./RubricsFunction";
import { getAllCriteria } from "../Criteria/CriteriaFunctions";
import Alerta from "../../../components/Alerta";
import { BsFillSendFill } from "react-icons/bs";

const PostRubrics = ({ rubricSelect, textButton, onSuccessSave }) => {
  const [desRubric, setDesRubric] = useState("");
  const [idCriterio, setIdCriterio] = useState("");
  const [alerta, setAlerta] = useState({});
  const [selectedRubric, setSelectedRubric] = useState(null);
  const [criterios, setCriterios] = useState([]);
  console.log(rubricSelect);
  

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["criterios-for-rubrics"],
    queryFn: getAllCriteria,
  });

  useEffect(() => {
    if (isLoading) {
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
      setCriterios(data);
    }
  }, [isLoading, isError, error, data]);

  //   Crear las nuevas rubricas
  const { mutate, isLoading: loading } = useMutation({
    mutationFn: createRubrics,
    onSuccess: (data) => {
      onSuccessSave();
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
    mutationFn: updateRubrics,
    onSuccess: (data) => {
      onSuccessSave();
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
    if (!desRubric) {
      setAlerta({
        msg: "El campo no puede estar vacio o con pocos caracteres!",
        error: true,
      });
      return;
    }
    if (textButton === "Enviar") {
      const data = { desRubric, idCriterio };
      mutate(data);
    } else if (textButton === "Actualizar") {
      const id_rubricas = rubricSelect.id_rubricas;
      const data = { id_rubricas, desRubric, idCriterio };
      mutateUpdate(data);
    }
  };

  const Criteria = criterios.Criteria || [];

  const setDataForm = () => {
    setDesRubric(rubricSelect.des_rubricas);
    setIdCriterio(rubricSelect.id_criterio);
    const selected = Criteria.find(
      (criterio) =>
        criterio.id_criterio === rubricSelect.id_criterio
    );
    setSelectedRubric(selected || null);
  };
  useEffect(() => {
    setDataForm();
  }, [rubricSelect]);

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
                Descripcion de la Rubrica
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Escribe la descripcion de la Rubrica..."
                  value={desRubric}
                  onChange={(e) => setDesRubric(e?.target?.value)}
                ></textarea>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-base font-medium text-gray-700 select-none text-start mb-1" htmlFor="Criterios">
                Criterios
              </label>
              <select
                id="Criterios"
                value={idCriterio}
                onChange={(e) => setIdCriterio(e.target.value)}
                className="w-full p-2 placeholder-gray-400 rounded-md focus:border-green-500 focus:ring-green-500"
                size="5"
              >
                <option value="">Seleccione un Criterio:</option>
                {Criteria.map((critero) => (
                  <option
                    key={critero.id_criterio}
                    value={critero.id_criterio}
                  >
                    {critero.des_criterio}
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

export default PostRubrics;
