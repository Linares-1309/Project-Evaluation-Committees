import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineNoteAdd } from "react-icons/md";

import WriteTable from "../../../tables/DataTables.jsx";
import ModalWindow from "../../../components/ModalDialog";
import Alerta from "../../../components/Alerta.jsx";
import GetIdea from "./GetIdea.jsx";
import DeleteIdea from "./DeleteIdea.jsx";
import PostIdeas from "./PostIdeas.jsx";
import { getAllIdeas } from "./IdeasFunctions.jsx";
// import { useNavigate } from "react-router-dom";

const IdeasList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
  const [selectedIdCommitte, setSelectedIdCommitte] = useState(null);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [textButton, setTextButton] = useState("Enviar");
  const [isOpen, setIsOpen] = useState(false);
  const [ideaSelect, setIdeaSelect] = useState({
    id_idea: "",
    nom_idea: "",
    estado_idea: "",
    des_idea: "",
    cal_final: "",
    id_proponente: "",
  });
  // const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const queryClient = useQueryClient();

  const handleEditClick = (id_idea) => {
    setSelectedIdEdit(id_idea);
  };

  const handleDeleteClick = (id_idea) => {
    setSelectedIdDelete(id_idea);
  };

  const handleClickCommitte = async (id_idea) => {
    setSelectedIdCommitte(id_idea);
  };

  //  Consumo a Axios
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["ideas"],
    queryFn: getAllIdeas,
  });

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
  }, [isLoading, isError, error]);

  const refreshData = () => {
    queryClient.invalidateQueries("ideas");
  };

  const titleForm = ["Registrar Ideas"];
  const titles = [
    "ID Idea",
    "Nombre Idea",
    "Estado",
    "Descripción",
    "Calificacion",
    "Nombre Proponente",
    "Acciones",
  ];
  const ButtonsForOtherModules = (id_idea, estado_idea) => [
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
      <MdOutlineNoteAdd className="mr-1" />
      Comité
    </button>,
  ];

  const ideas = data?.ideas || [];
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
    rowData.push(ButtonsForOtherModules(idea?.id_idea, idea?.estado_idea));
    return rowData;
  });

  const updateTextButton = (text) => {
    setTextButton(text);
  };

  return (
    <>
      <h1 className="font-serif font-semibold uppercase text-2xl">
        Ideas de Innovación
      </h1>
      <ModalWindow
        toggleModal={toggleModal}
        isOpen={isOpen}
        form={
          <PostIdeas
            ideaSelect={ideaSelect}
            textButton={textButton}
            onSuccessSave={refreshData}
          />
        }
        titleForm={titleForm}
        updateTextButton={updateTextButton}
      />
      {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
      {crearDataTable && <WriteTable titles={titles} data={formattedData} />}
      {selectedIdEdit ||
        (selectedIdCommitte && (
          <GetIdea
            id_idea={selectedIdEdit}
            id_idea_for_committe={selectedIdCommitte}
            setIdeaSelect={setIdeaSelect}
          />
        ))}
      {selectedIdDelete && (
        <DeleteIdea id_idea={selectedIdDelete} onSuccessDel={refreshData} />
      )}
    </>
  );
};

export default IdeasList;
