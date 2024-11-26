import { getAllSetOfCriteria } from "./SetOfCriteriaFunctions.jsx";
import { useState, useEffect } from "react";
import Alerta from "../../../components/Alerta.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import WriteTable from "../../../tables/DataTables.jsx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import GetSetOfCriteria from "./getSetOfCriteria.jsx";
import DeleteSetOfCriteria from "./DeleteSetOfCriteria.jsx";
import ModalDialog from "../../../components/ModalDialog.jsx";
import PostSetOfCriteria from "./PostSetOfCriteria.jsx";

const SetOfCriteriaList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Uso de react-query para manejar el cache
  const queryClient = useQueryClient();

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

  const titles = ["ID Conjunto Criterios", "Descripción", "Acciones"];
  const ButtonsForOtherModules = (id_conjunto_criterio) => [
    <button
      className="text-white bg-blue-600 hover:bg-blue-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="get"
      title="Editar"
      onClick={() => handleEditClick(id_conjunto_criterio)}
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
  ];

  const setOfCriteria = data?.setOfCriteria || [];

  const formattedData = setOfCriteria.map((conjuntoCriterio) => {
    const rowData = [
      conjuntoCriterio.id_conjunto_criterio,
      conjuntoCriterio.des_conjunto_criterio,
    ];
    rowData.push(ButtonsForOtherModules(conjuntoCriterio.id_conjunto_criterio));

    return rowData;
  });

  return (
    <>
      <h1 className="font-serif font-semibold uppercase text-2xl">
        Conjunto de Criterios
      </h1>
      {/* <button className="text-lg font-serif text-white bg-green-500 font-semibold rounded-md hover:bg-green-600 py-1.5 w-40 flex items-center px-3">
        <FaPlusCircle className="mr-3" size={18} /> AGREGAR
      </button> */}
      <ModalDialog toggleModal={toggleModal} isOpen={isOpen}/>
      {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
      {crearDataTable && <WriteTable titles={titles} data={formattedData} />}
      <PostSetOfCriteria/>
      {selectedIdEdit && (
        <GetSetOfCriteria id_conjunto_criterio={selectedIdEdit} />
      )}
      {selectedIdDelete && (
        <DeleteSetOfCriteria id_conjunto_criterio={selectedIdDelete} onSuccessDel={refreshData} />
      )}
    </>
  );
};

export default SetOfCriteriaList;
