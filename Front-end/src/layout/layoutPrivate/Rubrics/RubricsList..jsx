import { getAllRubrics } from "./RubricsFunction";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import WriteTable from "../../../tables/DataTables";
import ModalWindow from "../../../components/ModalDialog";
import Alerta from "../../../components/Alerta";
import GetRubrics from "./GetRubrics";
import PostRubrics from "./PostRubrics";
import DeleteRubrics from "./DeleteRubrics";

const RubricsList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
  const [textButton, setTextButton] = useState("Enviar");
  const [isOpen, setIsOpen] = useState(false);
  const [rubricSelect, setRubricSelect] = useState({
    id_rubricas: "",
    des_rubricas: "",
    id_criterio: "",
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const queryClient = useQueryClient();

  const handleEditClick = (id_rubricas) => {
    setSelectedIdEdit(id_rubricas);
  };

  const handleDeleteClick = (id_rubricas) => {
    setSelectedIdDelete(id_rubricas);
  };

  // Realizamos la consulta
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["rubricas"],
    queryFn: getAllRubrics,
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

  const titleForm = ["Registrar Rubricas"];
  const titles = ["ID", "Descripción", "Criterios", "Acciones"];

  const ButtonsForOtherModules = (id_rubricas) => [
    <button
      className="text-white bg-blue-600 hover:bg-blue-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="get"
      title="Editar"
      onClick={() => [
        handleEditClick(id_rubricas),
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
      onClick={() => handleDeleteClick(id_rubricas)}
    >
      <MdDelete className="mr-1" /> Eliminar
    </button>,
  ];

  const Rubrics = data?.Rubrics || [];

  const formattedData = Rubrics.map((rubricas) => {
    const rowData = [
      rubricas?.id_rubricas,
      rubricas?.des_rubricas,
      rubricas?.criteria_for_rubric?.des_criterio,
    ];

    rowData.push(ButtonsForOtherModules(rubricas?.id_rubricas));

    return rowData;
  });

  const updateTextButton = (text) => {
    setTextButton(text);
  };

  return (
    <>
      <h1 className="font-RobotoSlab font-semibold uppercase text-2xl">Rubricas</h1>
      <ModalWindow
        toggleModal={toggleModal}
        isOpen={isOpen}
        form={
          <PostRubrics
            rubricSelect={rubricSelect}
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
        <GetRubrics
          id_rubricas={selectedIdEdit}
          setRubricSelect={setRubricSelect}
        />
      )}
      {selectedIdDelete && (
        <DeleteRubrics
          id_rubricas={selectedIdDelete}
          onSuccessDel={refreshData}
        />
      )}
    </>
  );
};

export default RubricsList;
