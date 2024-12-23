// Iconos de Componente
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbPencilCode } from "react-icons/tb";

// Librerias
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Componentes
import WriteTable from "../../../tables/DataTables.jsx";
import ModalWindow from "../../../components/ModalDialog.jsx";
import Alerta from "../../../components/Alerta.jsx";
import GetIdea from "./GetIdea.jsx";
import DeleteIdea from "./DeleteIdea.jsx";
import PostIdeas from "./PostIdeas.jsx";
import { getAllIdeas } from "./IdeasFunctions.jsx";
import useAuth from "../../../hooks/useAuth.jsx";

const IdeasList = () => {
  // State para la alerta
  const [alerta, setAlerta] = useState({});

  // State para crear la tabla si hay data disponible
  const [crearDataTable, setCrearDataTable] = useState(false);

  // State para almacenar el Id de la idea y asi montar el conponente si este esta disponible
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
  const [selectedIdCommitte, setSelectedIdCommitte] = useState(null);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);

  // Texto del boton
  const [textButton, setTextButton] = useState("Enviar");

  // Rol de usuario
  const { roleUser } = useAuth();

  // State para abrir y cerrar la ventana modal del formulario
  const [isOpen, setIsOpen] = useState(false);

  // Almacena la idea que se va a editar
  const [ideaSelect, setIdeaSelect] = useState({});

  // Limpiar el formulario
  const resetForm = () => {
    setIdeaSelect({});
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
    queryClient.invalidateQueries("ideas");
  };

  // Funciones para manejar los eventos de los botones
  const handleEditClick = (id_idea) => {
    setSelectedIdEdit(id_idea);
  };
  const handleDeleteClick = (id_idea) => {
    setSelectedIdDelete(id_idea);
  };
  const handleClickCommitte = async (id_idea) => {
    setSelectedIdCommitte(id_idea);
  };

  //  Realizamos la consulta
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["ideas"],
    queryFn: getAllIdeas,
  });

  // Efecto para manejar la alerta
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
  }, [isLoading, isError, error]);

  // Titulo del formulario
  const titleForm = ["Registrar Ideas"];

  // Titulos de la tabla
  const titles = [
    "ID",
    "Nombre Idea",
    "Estado",
    "Descripción",
    "Calificacion",
    "Nombre Proponente",
    "Acciones",
  ];

  // Botones de la tabla
  const ButtonsForTable = (id_idea, estado_idea) => {
    return [
      <button
        className={
          estado_idea === "Convocado"
            ? `text-black bg-green-50 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2 cursor-not-allowed`
            : `text-white bg-green-500 hover:bg-green-600 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2`
        }
        key="get"
        title="Comite Evaluación"
        onClick={() => [handleClickCommitte(id_idea)]}
        disabled={estado_idea === "Convocado"}
      >
        <TbPencilCode className="mr-1" />
        Comité
      </button>,
      // Botones solo para administradores
      ...(isAdmin
        ? [
            <button
              className="text-white bg-blue-600 hover:bg-blue-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
              key="get"
              title="Editar"
              onClick={() => [
                handleEditClick(id_idea),
                toggleModal(),
                setTextButton("Actualizar"),
              ]}
            >
              <FaEdit className="mr-1" />
              Editar
            </button>,
            <button
              className="text-white bg-red-600 hover:bg-red-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
              key="delete"
              title="Eliminar"
              onClick={() => handleDeleteClick(id_idea)}
            >
              <MdDelete className="mr-1" /> Eliminar
            </button>,
          ]
        : []),
    ];
  };

  // Extraer las ideas de la data
  const ideas = data?.ideas || [];

  // Formatear la data para enviarla a la tabla
  const formattedData = ideas.map((idea) => {
    const rowData = [
      idea?.id_idea,
      idea?.nom_idea,
      idea?.estado_idea,
      idea?.des_idea,
      idea?.cal_final,
      idea?.proponente?.nombres_proponente +
        " " +
        idea?.proponente?.apellidos_proponente,
    ];
    rowData.push(ButtonsForTable(idea?.id_idea, idea?.estado_idea));
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
        Ideas de Innovación
      </h1>
      {isAdmin && (
        <ModalWindow
          toggleModal={toggleModal}
          isOpen={isOpen}
          resetForm={resetForm}
          form={
            <PostIdeas
              ideaSelect={ideaSelect}
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
      {(selectedIdEdit || selectedIdCommitte) && (
        <GetIdea
          id_idea={selectedIdEdit}
          id_idea_for_committe={selectedIdCommitte}
          setIdeaSelect={setIdeaSelect}
        />
      )}
      {selectedIdDelete && (
        <DeleteIdea
          id_idea={selectedIdDelete}
          onSuccessDel={refreshData}
          setSelectedIdDelete={setSelectedIdDelete}
        />
      )}
    </>
  );
};

export default IdeasList;
