// Iconos de Componente
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Librerias
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Componentes
import { getAllRubrics } from "./RubricsFunction.jsx";
import WriteTable from "../../../tables/DataTables.jsx";
import ModalWindow from "../../../components/ModalDialog.jsx";
import Alerta from "../../../components/Alerta.jsx";
import GetRubrics from "./GetRubrics.jsx";
import PostRubrics from "./PostRubrics.jsx";
import DeleteRubrics from "./DeleteRubrics.jsx";
import useAuth from "../../../hooks/useAuth.jsx";

// Componente para listar las rubricas
const RubricsList = () => {
  // State para la alerta
  const [alerta, setAlerta] = useState({});

  // State para crear la tabla si hay data disponible
  const [crearDataTable, setCrearDataTable] = useState(false);

  // State para almacenar el Id de la rubrica y asi mosntar el conponente si este esta disponible
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);

  // Texto del boton
  const [textButton, setTextButton] = useState("Enviar");

  // State para abrir y cerrar la ventana modal del formulario
  const [isOpen, setIsOpen] = useState(false);

  // Almacena el rol de usuario para asi renderzar botones dinamicos
  const { roleUser } = useAuth();

  // State para almacenar la rubrica seleccionada
  const [rubricSelect, setRubricSelect] = useState({});

    // Limpiar el formulario
    const resetForm = () => {
      setRubricSelect({});
      setSelectedIdEdit(null);
    };

  // Almacena el rol de usuario para asi renderzar botones dinamicos
  const isAdmin = roleUser === "Admin";

  // Toggle para manejar el evnto de abrir y cerrar la modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Refrescar la data usando la queryKey
  const queryClient = useQueryClient();
  const refreshData = () => {
    queryClient.invalidateQueries("criterios"); // Refrescar la lista de criterios
  };

  // Almacenar los id para motar los componentes
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

  // UseEffect para manejar las actualizaciones de alerta
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

  // Titulos del formulario
  const titleForm = ["Registrar Rubricas"];

  // Titulos de la tabla
  const titles = ["ID", "Descripción", "Criterios", "Acciones"];

  // Botones de la tabla
  const ButtonsForTable = (id_rubricas) => {
    return isAdmin
      ? [
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
        ]
      : ["Sin acceso a acciones"];
  };

  const Rubrics = data?.Rubrics || [];

  // Formatear la data para la tabla
  const formattedData = Rubrics.map((rubricas) => {
    const rowData = [
      rubricas?.id_rubricas,
      rubricas?.des_rubricas,
      rubricas?.criteria_for_rubric?.des_criterio,
    ];

    rowData.push(ButtonsForTable(rubricas?.id_rubricas));

    return rowData;
  });

  // Actualizar el texto del boton
  const updateTextButton = (text) => {
    setTextButton(text);
  };

  // Renderizar el componente
  return (
    <>
      <h1 className="font-RobotoSlab font-semibold uppercase text-2xl mb-3">
        Rubricas
      </h1>
      {isAdmin && (
        <ModalWindow
          toggleModal={toggleModal}
          isOpen={isOpen}
          resetForm={resetForm}
          form={
            <PostRubrics
              rubricSelect={rubricSelect}
              textButton={textButton}
              onSuccessSave={refreshData}
              setTextButton={setTextButton}
              setSelectedIdEdit={setSelectedIdEdit}
            />
          }
          titleForm={titleForm}
          updateTextButton={updateTextButton}
        />
      )}
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
          setSelectedIdDelete={setSelectedIdDelete}
        />
      )}
    </>
  );
};

export default RubricsList;
