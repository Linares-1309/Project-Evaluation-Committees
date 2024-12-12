import { getAllProponents } from "./ProponentsFunctions.jsx";
import { useState, useEffect } from "react";
import Alerta from "../../../components/Alerta.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import WriteTable from "../../../tables/DataTables.jsx";
import ModalWindow from "../../../components/ModalDialog.jsx";
import GetProponents from "./GetProponents.jsx";
import DeleteProponents from "./DeleteProponents.jsx";
import PostProponents from "./PostProponents.jsx";

const ProponentsList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
  const [textButton, setTextButton] = useState("Enviar");

  const [isOpen, setIsOpen] = useState(false);

  const [proponentSelect, setProponentSelect] = useState({
    id_proponente: "",
    nombres_proponente: "",
    apellidos_proponente: "",
    correo_proponente: "",
    telefono_proponente: "",
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
    queryKey: ["proponentes"],
    queryFn: getAllProponents,
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
    queryClient.invalidateQueries("proponentes"); // Refrescar la lista de criterios
  };

  const titleForm = ["Registrar Proponenentes"];
  const titles = [
    "Documento",
    "Nombres",
    "Apellidos",
    "Correo",
    "Telefono",
    "Acciones",
  ];

  const ButtonsForOtherModules = (id_proponente) => [
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
  ];

  const proponents = data?.proponents || [];

  const formattedData = proponents.map((proponents) => {
    const rowData = [
      proponents?.id_proponente,
      proponents?.nombres_proponente,
      proponents?.apellidos_proponente,
      proponents?.correo_proponente,
      proponents?.telefono_proponente,
    ];
    rowData.push(ButtonsForOtherModules(proponents.id_proponente));

    return rowData;
  });

  const updateTextButton = (text) => {
    setTextButton(text);
  };

  return (
    <>
      <h1 className="font-RobotoSlab font-semibold uppercase text-2xl">
        Proponentes
      </h1>
      <ModalWindow
        toggleModal={toggleModal}
        isOpen={isOpen}
        form={
          <PostProponents
            proponentSelect={proponentSelect}
            textButton={textButton}
            onSuccessUpdate={refreshData}
          />
        }
        titleForm={titleForm}
        updateTextButton={updateTextButton}
      />
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
        />
      )}
    </>
  );
};

export default ProponentsList;
