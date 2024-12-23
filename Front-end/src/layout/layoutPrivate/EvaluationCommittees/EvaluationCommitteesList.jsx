// Librerías
import { FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Componentes y funciones
import WriteTable from "../../../tables/DataTables.jsx";
import Alerta from "../../../components/Alerta.jsx";
import { getAllEvaluationCommittees } from "./EvaluationCommitteesFunctions.jsx";
import ModalComitteCriteria from "../../../components/ModalComitteCriteria.jsx";
import GetEvaluationCommittees from "./GetEvaluationCommittees.jsx";

const EvaluationCommitteesList = () => {
  // State para manejar las alertas
  const [alerta, setAlerta] = useState({});

  // State para manejar la creación de la tabla
  const [crearDataTable, setCrearDataTable] = useState(false);

  // State para manejar el id seleccionado
  const [selectedIdGet, setSelectedIdGet] = useState(null);

  // State para manejar el modal
  const [isOpen, setIsOpen] = useState(false);

  // State para manejar el id del comite de criterios
  const [id_comité_criterios, set_id_comité_criterios] = useState("");

  // Funcion para abrir y cerrar el modal
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

  // Titulos de la tabla
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

  // Funcion para navegar a la vista de un comite
  const handleViewCommitte = (id_comites_evaluación) => {
    setSelectedIdGet(id_comites_evaluación);
  };

  // Botones para la tabla
  const ButtonsForTable = (id_comites_evaluacion) => [
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
        handleViewCommitte(id_comites_evaluacion);
      }}
    >
      <FaEye className="mr-1" />
      Comité
    </button>,
  ];

  // Extraer los datos para la tabla
  const ComitesEvaluacion = data?.evaluationCommittees || [];

  // Formatear los datos para la tabla
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
    rowData.push(ButtonsForTable(comite?.id_comites_evaluacion));
    return rowData;
  });

  // Retornar el componente
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
      {selectedIdGet && <GetEvaluationCommittees id_comite={selectedIdGet} />}
    </>
  );
};

export default EvaluationCommitteesList;
