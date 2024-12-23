/* eslint-disable react/prop-types */

// Iconos del componente
import { AiOutlineClose } from "react-icons/ai";

// Librerias
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Componentes
import { getCommitteCriteria } from "../layout/layoutPrivate/EvaluationCommittees/EvaluationCommitteesFunctions.jsx";
import Alerta from "./Alerta.jsx";

const ModalComitteCriteria = ({ toggleModal, isOpen, id_comité_criterios }) => {
  const [alerta, setAlerta] = useState({});

  // Realizar la consulta con el id_comite_criterios
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["Comite-Criterios", id_comité_criterios],
    queryFn: () => getCommitteCriteria(id_comité_criterios),
    enabled: !!id_comité_criterios,
  });

  // UseEffect para manejar las actualizaciones de alerta
  useEffect(() => {
    if (isLoading) {
      // Cargando la data
      setAlerta({
        msg: "Cargando...",
        error: false,
      });
    } else if (isError) {
      // Caso de error
      setAlerta({
        msg: error?.message || "Hubo un error!",
        error: true,
      });
    } else {
      // Caso de la consulta exitosa
      setAlerta({});
    }
  }, [isLoading, isError, error]);

  // Headers de la tabla
  const titles = ["ID", "Descripción del Criterio", "Calificación"];

  // Extraer el Objeto CommitteCriteria de la data para poder formatearla
  const CommitteeCriteria = data?.CommitteeCriteria || [];

  // Formateamos la data
  const formattedData = CommitteeCriteria.map((comite_criterio) => {
    const rowData = [
      comite_criterio?.id_comite_criterios,
      comite_criterio?.criteria_committees?.des_criterio,
      comite_criterio?.cal_comite_criterios,
    ];
    return rowData;
  });
  // Retornamos el HTML de la ventana modal con la tabla
  return (
    <>
      {isOpen && (
        <div
          id="static-modal"
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="relative p-4 w-full max-w-6xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Modal Comité Criterios
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="static-modal"
                  onClick={() => toggleModal()}
                >
                  <AiOutlineClose size={16} />
                  <span className="sr-only">Cerrar Modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh]">
                  {/* Si hay mensaje se muestra la alerta */}
                  {alerta.msg && (
                    <Alerta alerta={alerta} setAlerta={setAlerta} />
                  )}
                  <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        {/* Mapeamos los headers de la tabla */}
                        {titles.map((title, index) => (
                          <th scope="col" key={index} className="px-6 py-3">
                            {title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Mapeamos data que formateamos anteriormente */}
                      {formattedData.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-6 py-4">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="static-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => toggleModal()}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComitteCriteria;
