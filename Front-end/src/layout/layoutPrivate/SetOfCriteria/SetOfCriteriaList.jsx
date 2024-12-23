// iconos
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Librerias
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Componentes
import { getAllSetOfCriteria } from "./SetOfCriteriaFunctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import WriteTable from "../../../tables/DataTables.jsx";
import GetSetOfCriteria from "./GetSetOfCriteria.jsx";
import DeleteSetOfCriteria from "./DeleteSetOfCriteria.jsx";
import ModalDialog from "../../../components/ModalDialog.jsx";
import PostSetOfCriteria from "./PostSetOfCriteria.jsx";
import useAuth from "../../../hooks/useAuth.jsx";

// Componente para listar los conjuntos de criterios
const SetOfCriteriaList = () => {
  // State para la alerta
  const [alerta, setAlerta] = useState({});

  // State para crear la tabla si hay data disponible
  const [crearDataTable, setCrearDataTable] = useState(false);

  // State para almacenar el Id del criterio y asi mosntar el conponente si este esta disponible
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);

  // Manejo del modal
  const [isOpen, setIsOpen] = useState(false);

  // Texto del boton
  const [textButton, setTextButton] = useState("Enviar");

  // Rol de usuario
  const { roleUser } = useAuth();

  // State para almacenar el conjunto de criterios seleccionado
  const [setOfCriteriaSelect, setSetOfCriteriaSelect] = useState({});

  // Limpiar el formulario
  const resetForm = () => {
    setSetOfCriteriaSelect({});
    setSelectedIdEdit(null);
  };

  // Almacena el rol de usuario para asi renderzar botones dinamicos
  const isAdmin = roleUser === "Admin";

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Uso de react-query para manejar el cache
  const queryClient = useQueryClient();

  // Funciones para manejar los eventos de editar y eliminar
  const handleEditClick = (id_conjunto_criterio) => {
    setSelectedIdEdit(id_conjunto_criterio);
  };
  const handleDeleteClick = (id_conjunto_criterio) => {
    setSelectedIdDelete(id_conjunto_criterio);
  };

  // Realizamos la consulta para obtener todos los criterios
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["conjunto-criterios"],
    queryFn: getAllSetOfCriteria,
  });

  // Efecto para manejar la carga de la data
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
      setAlerta({});
      setCrearDataTable(true);
    }
  }, [isLoading, isError, error]);

  // Función que se llama cuando se elimina un criterio
  const refreshData = () => {
    queryClient.invalidateQueries("conjunto-criterios"); // Refrescar la lista de criterios
  };

  // Titulo del formulario
  const titleForm = ["Registrar Conjunto de Criterios de Evluación"];

  // Titulos de la tabla
  const titles = ["ID", "Descripción", "Acciones"];

  // Botones de la tabla
  const ButtonsForTable = (id_conjunto_criterio) => {
    return isAdmin
      ? [
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
            key="get"
            title="Editar"
            onClick={() => [
              handleEditClick(id_conjunto_criterio),
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
            onClick={() => handleDeleteClick(id_conjunto_criterio)}
          >
            <MdDelete className="mr-1" /> Eliminar
          </button>,
        ]
      : ["Sin acceso a acciones"];
  };

  const setOfCriteria = data?.setOfCriteria || [];

  // Formatear la data para la tabla
  const formattedData = setOfCriteria.map((conjuntoCriterio) => {
    const rowData = [
      conjuntoCriterio?.id_conjunto_criterio,
      conjuntoCriterio?.des_conjunto_criterio,
    ];
    rowData.push(ButtonsForTable(conjuntoCriterio.id_conjunto_criterio));

    return rowData;
  });

  // Actualizar el texto del boton
  const updateTextButton = (text) => {
    setTextButton(text);
  };

  // Render
  return (
    <>
      <h1 className="font-RobotoSlab font-semibold uppercase text-2xl mb-3">
        Conjunto de Criterios
      </h1>
      {isAdmin && (
        <ModalDialog
          toggleModal={toggleModal}
          isOpen={isOpen}
          resetForm={resetForm}
          form={
            <PostSetOfCriteria
              onSuccessSave={refreshData}
              setOfCriteriaSelect={setOfCriteriaSelect}
              textButton={textButton}
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
        <GetSetOfCriteria
          id_conjunto_criterio={selectedIdEdit}
          setSetOfCriteriaSelect={setSetOfCriteriaSelect}
        />
      )}
      {selectedIdDelete && (
        <DeleteSetOfCriteria
          id_conjunto_criterio={selectedIdDelete}
          onSuccessDel={refreshData}
          setSelectedIdDelete={setSelectedIdDelete}
        />
      )}
    </>
  );
};

export default SetOfCriteriaList;
