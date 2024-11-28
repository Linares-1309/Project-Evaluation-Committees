import { getAllIdeas } from "./IdeasFunctions.jsx";
import { useState, useEffect } from "react";
import Alerta from "../../../components/Alerta.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import WriteTable from "../../../tables/DataTables.jsx";
import ModalWindow from "../../../components/ModalDialog";

import GetIdea from "./GetIdea.jsx";
import DeleteIdea from "./DeleteIdea.jsx";
import PostIdeas from "./PostIdeas.jsx";

const IdeasList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
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

  const ideas = data?.ideas || [];
  const formattedData = ideas.map((idea) => {
    const rowData = [
      idea?.id_idea,
      idea?.nom_idea,
      idea?.estado_idea,
      idea?.des_idea,
      idea?.cal_final,
      idea?.proponents?.nombres_proponente,
    ];
    rowData.push(ButtonsForOtherModules(idea?.id_idea));
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
      {selectedIdEdit && (
        <GetIdea id_idea={selectedIdEdit} setIdeaSelect={setIdeaSelect} />
      )}
      {selectedIdDelete && (
        <DeleteIdea id_idea={selectedIdDelete} onSuccessDel={refreshData} />
      )}
    </>
  );
};

export default IdeasList;
