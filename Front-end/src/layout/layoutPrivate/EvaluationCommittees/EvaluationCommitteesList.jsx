/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import WriteTable from "../../../tables/DataTables";
import Alerta from "../../../components/Alerta";
import GetEvaluationCommittees from "./GetEvaluationCommittees";
import DeleteEvaluationCommittees from "./DeleteEvaluationCommittees";
import {
  getAllEvaluationCommittees,
  getAllCommitteesCriteria,
} from "./EvaluationCommitteesFunctions";
import TableEvaluationCommittes from "./TableEvaluationCommittees";

const EvaluationCommitteesList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [textButton, setTextButton] = useState("Enviar");
  const [isOpen, setIsOpen] = useState(false);

  // Realizar la consulta
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["Comites-Evalucion"],
    queryFn: getAllEvaluationCommittees,
  });

  const {
    data: dataComiteCriterios,
    error: errorComiteCriterios,
    isError: isErrorComiteCriterios,
    isLoading: isLoadingComiteCriterios,
  } = useQuery({
    queryKey: ["Comite-Criterios"],
    queryFn: getAllCommitteesCriteria,
  });

  // Usamos useEffect para manejar las actualizaciones de alerta
  useEffect(() => {
    if (isLoading || isLoadingComiteCriterios) {
      setAlerta({
        msg: "Cargando...",
        error: false,
      });
    } else if (isError || isErrorComiteCriterios) {
      setAlerta({
        msg:
          error?.message || errorComiteCriterios?.message || "Hubo un error!",
        error: true,
      });
    } else {
      // Si la consulta es exitosa, no hay alerta
      setAlerta({});
      setCrearDataTable(true);
    }
  }, [
    isLoading,
    isError,
    error,
    isLoadingComiteCriterios,
    isErrorComiteCriterios,
    errorComiteCriterios,
  ]);
  const titles = [
    "ID",
    "Fecha Comite",
    "Nombre Calificador",
    "Nombre Idea",
    "Nombre Proponente",
    "Telefono",
    "Correo",
    "Observaciones",
    "Acciones",
    
  ];
  const ButtonsForOtherModules = (id_rubricas) => [
    <button
      className="text-white bg-blue-600 hover:bg-blue-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="get"
      title="Editar"
      onClick={() => []}
    >
      <FaEdit className="mr-1" />
      Ver
    </button>,
  ];

  const ComitesEvaluacion = data?.evaluationCommittees || [];
  const CommitteeCriteria = dataComiteCriterios?.CommitteeCriteria || [];

  const formattedDta = ComitesEvaluacion.map((comite) => {
    const rowData = [
      comite?.id_comites_evaluación, //Id de comite
      comite?.fec_comité_evaluación, // Fecha del comite
      comite?.user?.username, // Nombre del evaluador
      comite?.ideas?.nom_idea, // Nombre de la idea
      comite?.ideas?.proponente?.nombres_proponente +
      " " +
      comite?.ideas?.proponente?.apellidos_proponente, // Nombres y apellidos del posible talento
      comite?.ideas?.proponente?.telefono_proponente,
      comite?.ideas?.proponente?.correo_proponente,
      comite?.Obs_Comite, //Observaciones por parte del evaluador
    ];
    rowData.push(ButtonsForOtherModules(comite?.id_comites_evaluación))
    return rowData
  });

  return (
    <>
    <h1 className="font-serif font-semibold uppercase text-2xl">Comites de Evaluacion de Ideas</h1>
    {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}

    { crearDataTable && <WriteTable  titles={titles} data={formattedDta}/>}
    </>
  )
};

export default EvaluationCommitteesList;
