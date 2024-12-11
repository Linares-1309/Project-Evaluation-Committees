import { getAllCriteria } from "./CriteriaFunctions.jsx";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import WriteTable from "../../../tables/DataTables.jsx";
import ModalWindow from "../../../components/ModalDialog.jsx";
import Alerta from "../../../components/Alerta.jsx";
import GetCriteria from "./GetCriteria.jsx";
import DeleteCriteria from "./DeleteCriteria.jsx";
import PostCriteria from "./PostCriteria.jsx";

const CriteriaList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
  const [textButton, setTextButton] = useState("Enviar");

  const [isOpen, setIsOpen] = useState(false);

  const [criteriaSelect, setCriteriaSelect] = useState({
    id_criterio: "",
    des_criterio: "",
    id_conjunto_criterio: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const queryClient = useQueryClient();

  const handleEditClick = (id_conjunto_criterio) => {
    setSelectedIdEdit(id_conjunto_criterio);
  };

  const handleDeleteClick = (id_conjunto_criterio) => {
    setSelectedIdDelete(id_conjunto_criterio);
  };

  // Realizamos la consulta
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["criterios"],
    queryFn: getAllCriteria,
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
        msg: error?.message || "Hubo un error",
        error: true,
      });
    } else {
      // Si la consulta es exitosa, no hay alerta
      setAlerta({});
      setCrearDataTable(true);
    }
  }, [isLoading, isError, error]); // Dependencias: cada vez que cambien estos valores

  // Función que se llama cuando se elimina un criterio
  const refreshData = () => {
    queryClient.invalidateQueries("criterios"); // Refrescar la lista de criterios
  };

  const titleForm = ["Registrar Criterios de Evluación"];
  const titles = [
    "ID",
    "Descripción",
    "Conjunto de Criterios",
    "Acciones",
  ];
  const ButtonsForOtherModules = (id_criterio) => [
    <button
      className="text-white bg-blue-600 hover:bg-blue-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="get"
      title="Editar"
      onClick={() => [
        handleEditClick(id_criterio),
        toggleModal(),
        setTextButton("Actualizar"),
      ]}
    >
      <FaEdit className="mr-1" />
      Editar
    </button>,
    <button
      className="text-white bg-red-600 hover:bg-red-700 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="delete"
      title="Eliminar"
      onClick={() => handleDeleteClick(id_criterio)}
    >
      <MdDelete className="mr-1" /> Eliminar
    </button>,
  ];
  const setCriteria = data?.Criteria || [];

  const formattedData = setCriteria.map((criterios) => {
    const rowData = [
      criterios?.id_criterio,
      criterios?.des_criterio,
      criterios?.criterio?.des_conjunto_criterio,
    ];
    rowData.push(ButtonsForOtherModules(criterios?.id_criterio));

    return rowData;
  });
  
  const updateTextButton = (text) => {
    setTextButton(text);
  };

  return (
    <>
      <h1 className="font-serif font-semibold uppercase text-2xl">
        Criterios de Evaluación
      </h1>
      <ModalWindow
        toggleModal={toggleModal}
        isOpen={isOpen}
        form={
          <PostCriteria
            criteriaSelect={criteriaSelect}
            textButton={textButton}
            onSuccessSave={refreshData}
          />
        }
        titleForm={titleForm}
        updateTextButton={updateTextButton}
      />
      {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
      {crearDataTable && <WriteTable titles={titles} data={formattedData} />}
      {selectedIdEdit && (
        <GetCriteria
          id_criterio={selectedIdEdit}
          setCriteriaSelect={setCriteriaSelect}
        />
      )}
      {selectedIdDelete && (
        <DeleteCriteria
          id_criterio={selectedIdDelete}
          onSuccessDel={refreshData}
        />
      )}
    </>
  );
};

export default CriteriaList;
