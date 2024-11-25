import { getAllSetOfCriteria, getSetOfCriteria } from "./SetOfCriteriaFunctions.jsx";
import { useState, useEffect } from "react";
import Alerta from "../../../components/Alerta.jsx";
import { useQuery } from "@tanstack/react-query";
import WriteTable from "./../../../tables/DataTables.jsx";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SetOfCriteriaList = ({id_conjunto_criterio}) => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);

  // Realizamos la consulta
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["conjunto-criterios"],
    queryFn: getAllSetOfCriteria,
  });

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["conjunto-criterios-by-id", id_conjunto_criterio],
    queryFn: getSetOfCriteria(id_conjunto_criterio),
    enabled: !!id_conjunto_criterio
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
    } else if (error) {
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

  const titles = ["ID Conjunto Criterios", "Descripción", "Acciones"];
  const ButtonsForOtherModules = () => [
    <button
      className="text-white bg-blue-600 hover:bg-blue-700 mr-3 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="get"
      title="Editar"
    >
      <FaEdit className="mr-1" />
      Edit
    </button>,
    <button
      className="text-white bg-red-600 hover:bg-red-700 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="delete"
      title="Eliminar"
    >
      <MdDelete className="mr-1" /> Delete
    </button>,
  ];

  const setOfCriteria = data?.setOfCriteria || [];

  const formattedData = setOfCriteria.map((conjuntoCriterio) => {
    const rowData = [
      conjuntoCriterio.id_conjunto_criterio,
      conjuntoCriterio.des_conjunto_criterio,
    ];
    rowData.push(ButtonsForOtherModules(conjuntoCriterio.Id_Aprendiz));

    return rowData;
  });

 

  return (
    <>
      <h1 className="font-serif font-semibold uppercase text-2xl">
        Conjunto de Criterios
      </h1>
      <button className="text-lg font-serif text-white bg-green-500 font-semibold rounded-md hover:bg-green-600 py-1.5 w-40 flex items-center px-3">
        <FaPlusCircle className="mr-3" size={18} /> AGREGAR
      </button>
      {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
      {crearDataTable && <WriteTable titles={titles} data={formattedData} />}
    </>
  );
};

export default SetOfCriteriaList;
