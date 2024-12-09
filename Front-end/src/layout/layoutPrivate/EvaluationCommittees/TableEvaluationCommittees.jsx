/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CryptoJS from "crypto-js";

import { getAllSetOfCriteria } from "../SetOfCriteria/SetOfCriteriaFunctions.jsx";
import { newEvaluationCommitte } from "./EvaluationCommitteesFunctions.jsx";
import { getAllCriteria } from "../Criteria/CriteriaFunctions";
import { getAllRubrics } from "../Rubrics/RubricsFunction";
import Alerta from "../../../components/Alerta";
import useAuth from "../../../hooks/useAuth";

const KEY_SECRET = `${import.meta.env.VITE_SECRET_KEY_LOCAL}`;

const TableEvaluationCommittes = () => {
  const [idIdea, setIdIdea] = useState("");
  const [fecComiteEvaluacion, setFecComiteEvaluacion] = useState("");
  const [idUser, setIdUser] = useState("");
  const [alerta, setAlerta] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [obsComite, setObsComite] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const refreshData = () => {
    queryClient.invalidateQueries("ideas");
  };
  const { mutate, isError, isLoading } = useMutation({
    mutationFn: newEvaluationCommitte,
    onSuccess: (data) => {
      setAlerta({
        msg: data.msg,
        error: false,
      });
      refreshData();
    },
    onError: (error) => {
      setAlerta({
        msg: error.message,
        error: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    const data = {
      idIdea,
      fecComiteEvaluacion,
      idUser,
      selectedValues,
      obsComite,
    };
    mutate(data);
  };
  // Manejar el cambio de los selects
  const handleChange = (criterioId, value) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [criterioId]: value,
    }));
  };

  const loadDataFromLocalStorage = (key) => {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) {
      return null;
    }
    const bytes = CryptoJS.AES.decrypt(encryptedData, KEY_SECRET);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };
  const idea = loadDataFromLocalStorage("dataIdea");

  // Generamos la fecha actual
  const hoy = new Date();
  const dia = hoy.getDate();
  const mes = hoy.getMonth() + 1;
  const año = hoy.getFullYear();

  const setDtaCommittees = async () => {
    setIdIdea(idea?.id_idea);
    setFecComiteEvaluacion(Date.now());
    setIdUser(auth?.user.Id_User);
  };
  useEffect(() => {
    setDtaCommittees();
  }, []);

  // Obtener los criterios de evaluacion para pasarlos a la tabla
  const {
    data: dataCriteria,
    error: errorCriteria,
    isLoading: isLoadingCriteria,
    isError: isErrorCriteria,
  } = useQuery({
    queryKey: ["criterios-for-committees"],
    queryFn: getAllCriteria,
  });

  useEffect(() => {
    if (isLoadingCriteria) {
      setAlerta({
        msg: "Cargando...",
        error: false,
      });
    } else if (isErrorCriteria) {
      setAlerta({
        msg: errorCriteria?.message || "Hubo un error",
        error: true,
      });
    } else {
      setAlerta({});
    }
  }, [isLoadingCriteria, isErrorCriteria, errorCriteria]);

  const criterios = dataCriteria?.Criteria || [];

  // Obtener lo conjuntos de criterios de evaluacion para pasarlos a la tabla junto con el criterio correspondiente
  const {
    data: dataSetOfCriteria,
    isLoading: isLoadingSetOfCriteria,
    error: errorSetOfCriteria,
    isError: isErrorSetOfCriteria,
  } = useQuery({
    queryKey: ["set-of-criteria-for-committees"],
    queryFn: getAllSetOfCriteria,
  });

  useEffect(() => {
    if (isLoadingSetOfCriteria) {
      setAlerta({
        msg: "Cargando...",
        error: false,
      });
    } else if (isErrorSetOfCriteria) {
      setAlerta({
        msg: errorSetOfCriteria?.message || "Hubo un error",
        error: true,
      });
    } else {
      setAlerta({});
      // setCrearDataTable(true);
    }
  }, [isLoadingSetOfCriteria, isErrorSetOfCriteria, errorSetOfCriteria]);

  const SetOfCriteria = dataSetOfCriteria?.setOfCriteria || [];

  // Obtener las rubricas para poder mostrar en la tabla
  const {
    data: dataRubrics,
    isLoading: iSLoadingRubrics,
    error: errorRubrics,
    isError: isErrorRubrics,
  } = useQuery({
    queryKey: ["rubrics-for-committees"],
    queryFn: getAllRubrics,
  });

  useEffect(() => {
    if (iSLoadingRubrics) {
      setAlerta({
        msg: "Cargando...",
        error: false,
      });
    } else if (isErrorRubrics) {
      setAlerta({
        msg: errorRubrics?.message || "Hubo un error",
        error: true,
      });
    } else {
      setAlerta({});
      // setCrearDataTable(true);
    }
  }, [iSLoadingRubrics, isErrorRubrics, errorRubrics]);

  const Rubrics = dataRubrics?.Rubrics || [];

  const handleClick = () => {
    navigate("/admin/ideas");
    localStorage.removeItem("dataIdea");
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="border border-black bg-gray-200 select-none p-2">
              SERVICIO NACIONAL DE APRENDIZAJE SENA
            </th>
          </tr>
          <tr>
            <th className="border border-black bg-gray-200 select-none p-2">
              SENNOVA
            </th>
          </tr>
          <tr>
            <th className="border border-black bg-gray-200 select-none p-2">
              RED TECNOPARQUE TOLIMA
            </th>
          </tr>
        </thead>
      </table>
      <table>
        <thead>
          <tr className="border border-black ">
            <th className="w-4/5 bg-gray-200">TECNOPARQUE NODO TOLIMA</th>
            <th>
              <table>
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black px-4">Comite No.</th>
                    <th className="border border-black px-4">Día</th>
                    <th className="border border-black px-4">Mes</th>
                    <th className="border border-black px-5">Año</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black px-4">{idea.id_idea}</td>
                    <td className="border border-black px-4">{dia}</td>
                    <td className="border border-black px-4">{mes}</td>
                    <td className="border border-black px-5">{año}</td>
                  </tr>
                </tbody>
              </table>
            </th>
          </tr>
        </thead>
      </table>
      <table>
        <thead>
          <tr className="flex justify-around bg-gray-200 border border-black">
            <th>NOMBRE EVALUADOR</th>
            <th className="uppercase">
              {auth?.user?.username || auth?.username}
            </th>
          </tr>
          <tr className="flex justify-center border border-black bg-gray-200 my-1 py-1">
            <th className="tracking-wider">1. INFORMACION DE LA IDEA</th>
          </tr>

          <tr className="flex justify-around bg-gray-200 border border-black my-1">
            <th>Titulo de la Idea</th>
            <th>{idea?.nom_idea}</th>
          </tr>

          <tr className="flex justify-around bg-gray-200 border border-black my-1">
            <th>Codigo de la Idea</th>
            <th>{idea?.id_idea}</th>
          </tr>

          <tr className="flex justify-around bg-gray-200 border border-black my-1">
            <th>Nombre de Quien Presenta la Idea</th>
            <th>{idea?.nom_proponente}</th>
          </tr>
          <tr className="flex justify-center border border-black bg-gray-200 my-1 py-1">
            <th className="tracking-wider">
              2. EVALUACIÓN DE VIABILIDAD DEL ACOMPAÑAMIENTO DE LA IDEA
            </th>
          </tr>
        </thead>
      </table>
      <form action="" onSubmit={handleSubmit}>
        <table
          className="table-auto w-full text-sm rtl:text-right text-center table table-responsive border-b border-black"
          id="tableData"
        >
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-black">
            <tr>
              <th className="border border-black bg-gray-200 select-none p-2">
                Conjunto de Criterio
              </th>
              <th className="border border-black bg-gray-200 select-none p-2">
                Criterio
              </th>
              <th className="border border-black bg-gray-200 select-none p-2">
                Rúbrica
              </th>
              <th className="border border-black bg-gray-200 select-none p-2">
                Evaluador
              </th>
            </tr>
          </thead>
          <tbody>
            {SetOfCriteria.map((conjunto) => {
              const criteriosFiltrados = criterios.filter(
                (criterio) =>
                  criterio.id_conjunto_criterio ===
                  conjunto.id_conjunto_criterio
              );
              const numRows = criteriosFiltrados.length;

              return (
                <>
                  {criteriosFiltrados.map((criterio, index) => {
                    const rubricasFiltradas = Rubrics.filter(
                      (rubric) => rubric.id_criterio === criterio.id_criterio
                    );

                    if (rubricasFiltradas.length > 0) {
                      return (
                        <tr key={criterio.id_criterio}>
                          {index === 0 && (
                            <td
                              rowSpan={numRows}
                              className="align-middle border border-black p-2"
                              style={{ width: "22%" }}
                            >
                              {conjunto.des_conjunto_criterio}
                            </td>
                          )}
                          <td className="align-middle border border-black p-2">
                            {criterio.des_criterio}
                          </td>
                          <td className="align-middle border border-black p-2">
                            <ul className="m-0 pl-5">
                              {rubricasFiltradas.map((rubrica) => (
                                <li key={rubrica.id_rubricas}>
                                  {"- " + rubrica.des_rubricas}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="align-middle border border-black p-2">
                            <select
                              name=""
                              id=""
                              className="w-full bg-transparent placeholder:text-gray-800 text-sm border border-green-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-green-500 hover:border-green-300 shadow-sm focus:shadow appearance-none cursor-pointer focus:ring-green-500 "
                              onChange={(e) =>
                                handleChange(
                                  criterio.id_criterio,
                                  e?.target?.value
                                )
                              }
                              value={selectedValues[criterio.id_criterio] || ""}
                            >
                              <option defaultValue={" "}>-</option>
                              {Array.from({ length: 10 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    }

                    // Segunda sección: criterios sin rúbricas
                    return (
                      <tr key={criterio.id_criterio}>
                        {index === 0 && (
                          <td
                            rowSpan={numRows}
                            className="align-middle border border-black p-2"
                          >
                            {conjunto.des_conjunto_criterio}
                          </td>
                        )}
                        <td
                          colSpan={2}
                          className="align-middle border border-black p-2"
                        >
                          {criterio.des_criterio}
                        </td>
                        <td className="border border-black p-2 text-center align-middle">
                          <select
                            className="w-full bg-transparent text-sm border border-green-200 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-green-500 hover:border-green-300 focus:ring-green-500 "
                            onChange={(e) =>
                              handleChange(
                                criterio.id_criterio,
                                e?.target?.value
                              )
                            }
                            value={selectedValues[criterio.id_criterio] || ""}
                          >
                            <option value="">-</option>
                            <option value="Si">Sí</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
        <table className="table-auto w-full  text-sm rtl:text-right text-center table table-responsive border-b border-black">
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-black">
            <tr>
              <th className="border border-black bg-gray-200 select-none p-2">
                Observaciones del Evaluador
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle border border-black p-2">
                <textarea
                  id="message"
                  rows="3"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50
                 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="Escribe las observaciones..."
                  onChange={(e) => setObsComite(e?.target?.value)}
                  value={obsComite}
                ></textarea>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr className="border border-black">
              <div className="m-4">
                {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
              </div>
              <td className=" flex justify-around">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-3 m-4 px-5 rounded-md font-bold uppercase w-36"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={handleClick}
                  className="bg-red-600 text-white py-3 m-4 px-5 rounded-md font-bold uppercase w-36"
                >
                  Regresar
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </>
  );
};

export default TableEvaluationCommittes;
