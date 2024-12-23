// Iconos de Componente
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Librerias
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Componentes
import { getAllProponents } from "./ProponentsFunctions.jsx";
import Alerta from "../../../components/Alerta.jsx";
import WriteTable from "../../../tables/DataTables.jsx";
import ModalWindow from "../../../components/ModalDialog.jsx";
import GetProponents from "./GetProponents.jsx";
import DeleteProponents from "./DeleteProponents.jsx";
import PostProponents from "./PostProponents.jsx";
import useAuth from "../../../hooks/useAuth.jsx";

const ProponentsList = () => {
  // State para la alerta
  const [alerta, setAlerta] = useState({});
  // State para crear la tabla si hay data disponible
  const [crearDataTable, setCrearDataTable] = useState(false);

  // State para almacenar el Id del criterio y asi montar el conponente si este esta disponible
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);

  // Texto del boton
  const [textButton, setTextButton] = useState("Enviar");

  // Rol de usuario
  const { roleUser } = useAuth();

  // State para abrir y cerrar la ventana modal del formulario
  const [isOpen, setIsOpen] = useState(false);

  const [proponentSelect, setProponentSelect] = useState({});

  // Limpiar el formulario
  const resetForm = () => {
    setProponentSelect({});
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
    queryClient.invalidateQueries("proponentes"); // Refrescar la lista de criterios
  };

  // Funciones para manejar los eventos de editar y eliminar
  const handleEditClick = (id_conjunto_criterio) => {
    setSelectedIdEdit(id_conjunto_criterio);
  };
  const handleDeleteClick = (id_conjunto_criterio) => {
    setSelectedIdDelete(id_conjunto_criterio);
  };

  // Realizamos la consulta
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["proponentes"],
    queryFn: getAllProponents,
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

  // Titulos del formulario
  const titleForm = ["Registrar Proponenentes"];

  // Titulos de la tabla
  const titles = [
    "Documento",
    "Nombres",
    "Apellidos",
    "Correo",
    "Telefono",
    "Acciones",
  ];

  // Botones de la tabla
  const ButtonsForTable = (id_proponente) => {
    return isAdmin
      ? [
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
            key="get"
            title="Editar"
            onClick={() => [
              handleEditClick(id_proponente),
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
            onClick={() => handleDeleteClick(id_proponente)}
          >
            <MdDelete className="mr-1" /> Eliminar
          </button>,
        ]
      : ["Sin acceso a acciones"];
  };

  // Extraer los proponentes de la data
  const proponents = data?.proponents || [];

  // Formatear la data para la tabla
  const formattedData = proponents.map((proponents) => {
    const rowData = [
      proponents?.id_proponente,
      proponents?.nombres_proponente,
      proponents?.apellidos_proponente,
      proponents?.correo_proponente,
      proponents?.telefono_proponente,
    ];
    rowData.push(ButtonsForTable(proponents.id_proponente));

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
        Proponentes
      </h1>
      {isAdmin && (
        <ModalWindow
          toggleModal={toggleModal}
          isOpen={isOpen}
          resetForm={resetForm}
          form={
            <PostProponents
              proponentSelect={proponentSelect}
              textButton={textButton}
              onSuccessUpdate={refreshData}
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
        <GetProponents
          id_proponente={selectedIdEdit}
          setProponentSelect={setProponentSelect}
        />
      )}
      {selectedIdDelete && (
        <DeleteProponents
          id_proponente={selectedIdDelete}
          onSuccessDel={refreshData}
          setSelectedIdDelete={setSelectedIdDelete}
        />
      )}
    </>
  );
};

export default ProponentsList;
