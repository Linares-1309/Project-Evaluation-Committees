/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

// Librerías
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CryptoJS from "crypto-js";

// Componentes y funciones
import { getAllSetOfCriteria } from "../SetOfCriteria/SetOfCriteriaFunctions.jsx";
import { newEvaluationCommitte } from "./EvaluationCommitteesFunctions.jsx";
import { getAllCriteria } from "../Criteria/CriteriaFunctions.jsx";
import { getAllRubrics } from "../Rubrics/RubricsFunction.jsx";
import Alerta from "../../../components/Alerta.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import useProvider from "../../../hooks/useProvider.jsx";

// Variables globales
const KEY_SECRET = `${import.meta.env.VITE_SECRET_KEY_LOCAL}`;

// Componente principal
const TableEvaluationCommittes = () => {
  // State para la alerta
  const [alerta, setAlerta] = useState({});

  // Hooks
  const { auth, roleUser } = useAuth();
  const navigate = useNavigate();

  // Hooks para el manejo de los datos
  const { setSelectedIdIdeas, setSeletedCommittee } = useProvider();

  // State para la tabla de los comite
  const [idComite, setIdcomite] = useState("");
  const [fecha, setFecha] = useState([]);
  const [evaluador, setEvaluador] = useState("");
  const [tituloIdea, setTituloIdea] = useState("");
  const [codigoIdea, setCodigoIdea] = useState("");
  const [proponente, setProponente] = useState("");
  const [selectedValues, setSelectedValues] = useState({});
  const [obsComite, setObsComite] = useState("");

  // State para la información de los comites
  const [committee, setCommittee] = useState(null);

  // State para la información de las ideas
  const [idea, setIdea] = useState(null);

  // State para el manejo de la vista
  const [viewState, setViewState] = useState(false);

  // Query para refrescar los datos
  const queryClient = useQueryClient();
  const refreshData = () => {
    queryClient.invalidateQueries("ideas");
  };

  // Mutación para enviar la información del comite
  const { mutate, isError, isLoading } = useMutation({
    mutationFn: newEvaluationCommitte,
    onSuccess: (data) => {
      setAlerta({
        msg: data.msg + " " + "Redireccionando....",
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

  // Manejo de la alerta
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
    }
  }, [iSLoadingRubrics, isErrorRubrics, errorRubrics]);

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

  // Manejo de la alerta
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

  //  Manejo de la alerta
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
    }
  }, [isLoadingSetOfCriteria, isErrorSetOfCriteria, errorSetOfCriteria]);

  // Obtener la información de los criterios de evaluacion
  const criterios = dataCriteria?.Criteria || [];

  // Obtener la información de los conjuntos de criterios de evaluacion
  const SetOfCriteria = dataSetOfCriteria?.setOfCriteria || [];

  // Obtener la información de las rubricas
  const Rubrics = dataRubrics?.Rubrics || [];

  // Función para manejar el cambio de los select
  const handleChange = (criterioId, value) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [criterioId]: value,
    }));
  };

  // Función para cargar la información del local storage
  const loadDataFromLocalStorage = (key) => {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) {
      return null;
    }
    const bytes = CryptoJS.AES.decrypt(encryptedData, KEY_SECRET);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };

  // Cargar la información del local storage
  useEffect(() => {
    const idea = loadDataFromLocalStorage("dataIdea");
    const committee = loadDataFromLocalStorage("dataCommitte");

    if (committee) {
      setCommittee(committee);
    } else if (idea) {
      setIdea(idea);
    } else {
      if (roleUser === "Admin") {
        // navigate("/admin/comites");
      } else if (roleUser === "Calificador") {
        navigate("/user/comites");
      }
    }
  }, [navigate, roleUser]);

  // Enviar la información del comite a la tabla
  useEffect(() => {
    if (committee) {
      sendTableInformationCommitte();
    }
  }, [committee]);

  // Se envia la información del comite ya creado anteriormente a la tabla, ecepto la info de los select
  const sendTableInformationCommitte = () => {
    if (!committee) return;
    const fechaArray = committee?.fec_comite_evaluacion.split("-");
    setFecha(fechaArray);
    setIdcomite(committee?.id_comites_evaluacion);
    setEvaluador(committee?.user?.fullName);
    setTituloIdea(committee?.ideas?.nom_idea);
    setCodigoIdea(committee?.ideas?.id_idea);
    setProponente(
      committee?.ideas?.proponente?.nombres_proponente +
        " " +
        committee?.ideas?.proponente?.apellidos_proponente
    );
    setViewState(true);
  };

  // Enviar la información de la idea a la tabla
  useEffect(() => {
    if (idea) {
      setDtaCommittees();
    }
  }, [idea]);

  // Se envia la información de la idea a la tabla
  const setDtaCommittees = async () => {
    setIdcomite(generateRandomIdCommittee());
    setFecha([año, mes, dia]);
    setEvaluador(auth?.user.fullName);
    setTituloIdea(idea?.nom_idea);
    setCodigoIdea(idea?.id_idea);
    setProponente(idea?.nom_proponente);
  };

  // Función para enviar la información del comite
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      idComite,
      codigoIdea,
      fecha,
      evaluador: auth?.user?.Id_User,
      selectedValues,
      obsComite,
    };
    mutate(data);
    handleGoBack();
  };

  // Enviamos la informacion de los select
  useEffect(() => {
    if (committee && committee?.comite_criterios) {
      const SetDataForTable = async () => {
        try {
          const values = committee.comite_criterios.reduce((acc, item) => {
            acc[item.id_criterio] = item.cal_comite_criterios;
            return acc;
          }, {});
          setSelectedValues((prev) => {
            const isEqual = JSON.stringify(prev) === JSON.stringify(values);
            return isEqual ? prev : values;
          });
          setObsComite(committee?.Obs_Comite);
        } catch (error) {
          console.error(`OCURRIO UN ERROR: ${error}`);
        }
      };
      SetDataForTable();
      sendTableInformationCommitte();
    }
  }, [committee]);

  // Generamos la fecha actual
  const hoy = new Date();
  const dia = hoy.getDate();
  const mes = hoy.getMonth() + 1;
  const año = hoy.getFullYear();

  // Generamos un id aleatorio para el comite
  const generateRandomIdCommittee = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 15; i++) {
      if (i > 0 && i % 5 === 0) {
        code += "-";
      }
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    return code;
  };

  // Limpiar los datos de la tabla
  const clearDataForTable = async () => {
    setIdcomite("");
    setFecha("");
    setEvaluador("");
    setTituloIdea("");
    setCodigoIdea("");
    setProponente("");
    setSelectedValues({});
    setObsComite("");
    setIdea(null);
    setCommittee(null);
  };

  // Redireccionar a la vista anterior
  const handleGoBack = () => {
    setAlerta({
      msg: "REDIRECCIONANDO...",
      error: false,
    });
    const timer = setTimeout(() => {
      clearDataForTable();
      localStorage.removeItem("dataIdea");
      localStorage.removeItem("dataCommitte");
      if (roleUser === "Admin") {
        navigate("/admin/ideas");
      } else if (roleUser === "Calificador") {
        navigate("/user/ideas");
      }
      setViewState(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  // Limpiar los estados cuando el componente se desmonte
  useEffect(() => {
    return () => {
      setFecha([]);
      setIdcomite("");
      setEvaluador("");
      setTituloIdea("");
      setCodigoIdea("");
      setProponente("");
      setViewState(false);
      setSelectedValues({});
      setObsComite("");
      setSelectedIdIdeas({});
      setSeletedCommittee({});
      clearDataForTable();
    };
  }, [location.pathname]);

  // useEffect(() => {
  //   // Limpia al montar el componente o volver a la vista
  //   clearDataForTable();
  // }, []); // `location.pathname` depende de `react-router-dom`
  

  // Renderizar la tabla
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
                    <th className="border border-black px-4 text-xs">
                      Comite No.
                    </th>
                    <th className="border border-black px-4 text-xs">Día</th>
                    <th className="border border-black px-4 text-xs">Mes</th>
                    <th className="border border-black px-5 text-xs">Año</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black px-4 text-xs">
                      {idComite}
                    </td>
                    <td className="border border-black px-4 text-xs">
                      {fecha[2]}
                    </td>
                    <td className="border border-black px-4 text-xs">
                      {fecha[1]}
                    </td>
                    <td className="border border-black px-5 text-xs">
                      {fecha[0]}
                    </td>
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
            <th className="uppercase">{evaluador}</th>
          </tr>
          <tr className="flex justify-center border border-black bg-gray-200 my-1 py-1">
            <th className="tracking-wider">1. INFORMACION DE LA IDEA</th>
          </tr>

          <tr className="flex justify-around bg-gray-200 border border-black my-1">
            <th>Titulo de la Idea</th>
            <th>{tituloIdea}</th>
          </tr>

          <tr className="flex justify-around bg-gray-200 border border-black my-1">
            <th>Codigo de la Idea</th>
            <th>{codigoIdea}</th>
          </tr>

          <tr className="flex justify-around bg-gray-200 border border-black my-1">
            <th>Nombre de Quien Presenta la Idea</th>
            <th>{proponente}</th>
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
                              className={
                                viewState
                                  ? "w-full bg-transparent text-sm border border-green-200 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-green-500 hover:border-green-300 focus:ring-green-500 cursor-not-allowed"
                                  : "w-full bg-transparent text-sm border border-green-200 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-green-500 hover:border-green-300 focus:ring-green-500 cursor-pointer"
                              }
                              onChange={(e) =>
                                handleChange(
                                  criterio.id_criterio,
                                  e?.target?.value
                                )
                              }
                              value={selectedValues[criterio.id_criterio] || ""}
                              disabled={viewState}
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
                            className={
                              viewState
                                ? "w-full bg-transparent text-sm border border-green-200 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-green-500 hover:border-green-300 focus:ring-green-500 cursor-not-allowed"
                                : "w-full bg-transparent text-sm border border-green-200 rounded pl-3 pr-8 py-2 focus:outline-none focus:border-green-500 hover:border-green-300 focus:ring-green-500 cursor-pointer"
                            }
                            onChange={(e) =>
                              handleChange(
                                criterio.id_criterio,
                                e?.target?.value
                              )
                            }
                            value={selectedValues[criterio.id_criterio] || ""}
                            disabled={viewState}
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
        <table className="table-auto w-full text-sm rtl:text-right text-center table table-responsive border-b border-black">
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-black w-full">
            <tr>
              <th className="border border-black bg-gray-200 select-none p-2 w-full">
                Observaciones del Evaluador
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr>
              <td className="align-middle border border-black p-2 w-full ">
                <textarea
                  id="message"
                  rows="5"
                  className={
                    viewState
                      ? `block p-2.5 w-full text-sm text-gray-900 bg-gray-50
            focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 select-none cursor-not-allowed`
                      : `block p-2.5 w-full text-sm text-gray-900 bg-gray-50
            focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 select-none cursor-pointer`
                  }
                  placeholder="Escribe las observaciones..."
                  onChange={(e) => setObsComite(e?.target?.value)}
                  value={obsComite}
                  disabled={viewState}
                ></textarea>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr className={alerta.msg ? `border border-black` : ``}>
              <td className=" flex justify-center">
                <div className={alerta.msg ? `py-3 w-2/4  ` : ``}>
                  {alerta.msg && (
                    <Alerta alerta={alerta} setAlerta={setAlerta} />
                  )}
                </div>
              </td>
            </tr>
            <tr className="border border-black">
              <td className="flex justify-around">
                {viewState ? (
                  " "
                ) : (
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-3 m-4 px-5 rounded-md font-bold uppercase w-36"
                  >
                    Guardar
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleGoBack}
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
