/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEye, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import WriteTable from "../../../tables/DataTables.jsx";
import Alerta from "../../../components/Alerta.jsx";
import { getAllEvaluationCommittees } from "./EvaluationCommitteesFunctions.jsx";
import ModalComitteCriteria from "../../../components/ModalComitteCriteria.jsx";
import GetEvaluationCommittees from "./GetEvaluationCommittees.jsx";

const EvaluationCommitteesList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdGet, setSelectedIdGet] = useState(null);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [textButton, setTextButton] = useState("Enviar");
  const [isOpen, setIsOpen] = useState(false);
  const [id_comité_criterios, set_id_comité_criterios] = useState("");
  const [committeeSelect, setCommitteeSelect] = useState([]);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Realizar la consulta
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["Comites-Evalucion"],
    queryFn: getAllEvaluationCommittees,
  });

  // Usamos useEffect para manejar las actualizaciones de alerta
  useEffect(() => {
    if (isLoading) {
      setAlerta({
        msg: "Cargando...",
        error: false,
      });
    } else if (isError) {
      setAlerta({
        msg: error?.message || "Hubo un error!",
        error: true,
      });
      console.log(error);
    } else {
      // Si la consulta es exitosa, no hay alerta
      setAlerta({});
      setCrearDataTable(true);
    }
  }, [isLoading, isError, error]);
  const titles = [
    "Codigo",
    "Fecha Comite",
    "Nombre Calificador",
    "Nombre Idea",
    "Nombre Proponente",
    "Telefono",
    "Correo",
    "Observaciones",
    "Acciones",
  ];
  const navigateToCommittee = (id_comites_evaluación) => {
    setSelectedIdGet(id_comites_evaluación);
    // Obtener la data usando el ID, luego pasarla a la tabla del comité
      // navigate("/admin/comites/table");

  };
  const ButtonsForOtherModules = (id_comites_evaluacion) => [
    <button
      className="text-white bg-green-500 hover:bg-green-600 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="get"
      title="Ver Calificación"
      onClick={() => {
        toggleModal(), set_id_comité_criterios(id_comites_evaluacion);
      }}
    >
      <FaEye className="mr-1" />
      Calificación
    </button>,
    <button
      className="text-white bg-blue-600 hover:bg-blue-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="get"
      title="Ver Comité"
      onClick={() => {
        navigateToCommittee(id_comites_evaluacion);
      }}
    >
      <FaEye className="mr-1" />
      Comité
    </button>,
  ];

  const ComitesEvaluacion = data?.evaluationCommittees || [];

  const formattedDta = ComitesEvaluacion.map((comite) => {
    const rowData = [
      comite?.id_comites_evaluacion, //Id de comite
      comite?.fec_comite_evaluacion, // Fecha del comite
      comite?.user?.username, // Nombre del evaluador
      comite?.ideas?.nom_idea, // Nombre de la idea
      comite?.ideas?.proponente?.nombres_proponente +
        " " +
        comite?.ideas?.proponente?.apellidos_proponente, // Nombres y apellidos del posible talento
      comite?.ideas?.proponente?.telefono_proponente,
      comite?.ideas?.proponente?.correo_proponente,
      comite?.Obs_Comite, //Observaciones por parte del evaluador
    ];
    rowData.push(ButtonsForOtherModules(comite?.id_comites_evaluacion));
    return rowData;
  });

  return (
    <>
      <h1 className="font-RobotoSlab font-semibold uppercase text-2xl mb-3">
        Comites de Evaluacion de Ideas
      </h1>
      <ModalComitteCriteria
        isOpen={isOpen}
        toggleModal={toggleModal}
        id_comité_criterios={id_comité_criterios}
      />
      {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}

      {crearDataTable && <WriteTable titles={titles} data={formattedDta} />}
      {selectedIdGet && (
        <GetEvaluationCommittees
          id_comite={selectedIdGet}
          setCommitteeSelect={setCommitteeSelect}
        />
      )}
    </>
  );
};

export default EvaluationCommitteesList;
