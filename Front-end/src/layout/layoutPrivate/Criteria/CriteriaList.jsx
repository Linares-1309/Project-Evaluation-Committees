// Iconos de Componente
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Librerias
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Componentes
import { getAllCriteria } from "./CriteriaFunctions.jsx";
import WriteTable from "../../../tables/DataTables.jsx";
import ModalWindow from "../../../components/ModalDialog.jsx";
import Alerta from "../../../components/Alerta.jsx";
import GetCriteria from "./GetCriteria.jsx";
import DeleteCriteria from "./DeleteCriteria.jsx";
import PostCriteria from "./PostCriteria.jsx";
import useAuth from "../../../hooks/useAuth.jsx";

const CriteriaList = () => {
  // State para la alerta
  const [alerta, setAlerta] = useState({});

  // State para crear la tabla si hay data disponible
  const [crearDataTable, setCrearDataTable] = useState(false);

  // State para almacenar el Id del criterio y asi mosntar el conponente si este esta disponible
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);

  // Texto del boton
  const [textButton, setTextButton] = useState("Enviar");

  // Rol de usuario
  const { roleUser } = useAuth();

  // State para abrir y cerrar la ventana modal del formulario
  const [isOpen, setIsOpen] = useState(false);

  // Almacena el criterio que se va a editar
  const [criteriaSelect, setCriteriaSelect] = useState({});

  // Limpiar el formulario
  const resetForm = () => {
    setCriteriaSelect({});
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
    queryClient.invalidateQueries("criterios");
  };

  // Almacenar los id para motan los componentes
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
      // Si la consulta es exitosa, no hay alerta y se habilita para crear el dataTable
      setAlerta({});
      setCrearDataTable(true);
    }
  }, [isLoading, isError, error]); // se ejecuta cada que cambien las dependencias

  // Titulo del formulario
  const titleForm = ["Registrar Criterios de Evluación"];

  // Titulos de la tabla
  const titles = ["ID", "Descripción", "Conjunto de Criterios", "Acciones"];

  // Botones de la tabla
  const ButtonsForOtherModules = (id_criterio) => {
    return isAdmin
      ? [
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
        ]
      : ["Sin acceso a acciones"];
  };

  // Extraer los criterios de la data
  const setCriteria = data?.Criteria || [];

  // Formatear la data para enviarla a la tabla
  const formattedData = setCriteria.map((criterios) => {
    const rowData = [
      criterios?.id_criterio,
      criterios?.des_criterio,
      criterios?.criterio?.des_conjunto_criterio,
    ];
    rowData.push(ButtonsForOtherModules(criterios?.id_criterio));

    return rowData;
  });

  // Actualizar el texto del boton
  const updateTextButton = (text) => {
    setTextButton(text);
  };

  // Retornamos el html donde se renderizan los componetes hijos
  return (
    <>
      <h1 className="font-RobotoSlab font-semibold uppercase text-2xl mb-3">
        Criterios de Evaluación
      </h1>
      {isAdmin && (
        <ModalWindow
          toggleModal={toggleModal}
          isOpen={isOpen}
          resetForm={resetForm}
          form={
            <PostCriteria
              criteriaSelect={criteriaSelect}
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
        <GetCriteria
          id_criterio={selectedIdEdit}
          setCriteriaSelect={setCriteriaSelect}
        />
      )}
      {selectedIdDelete && (
        <DeleteCriteria
          id_criterio={selectedIdDelete}
          onSuccessDel={refreshData}
          setSelectedIdDelete={setSelectedIdDelete}
        />
      )}
    </>
  );
};

export default CriteriaList;
