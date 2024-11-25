import { getAllCriteria } from "./CriteriaFunctions.jsx";
import { useState, useEffect } from "react";
import Alerta from "../../../components/Alerta.jsx";
import { useQuery } from "@tanstack/react-query";

const CriteriaList = () => {
  const [alerta, setAlerta] = useState({});
  
  // Realizamos la consulta
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["criterios"],
    queryFn: getAllCriteria,
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
    }
  }, [isLoading, isError, error]); // Dependencias: cada vez que cambien estos valores

  return (
    <>
      {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
      <h1>Lista de Criterios</h1>
      <ul>
        {data?.map((criterio) => (
          <li key={criterio.id}>{criterio.name}</li>
        ))}
      </ul>
    </>
  );
};

export default CriteriaList;
