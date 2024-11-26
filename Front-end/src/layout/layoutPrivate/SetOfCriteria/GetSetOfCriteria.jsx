/* eslint-disable react/prop-types */
import { getSetOfCriteria } from "./SetOfCriteriaFunctions.jsx";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const GetSetOfCriteria = ({ id_conjunto_criterio }) => {
  const [criteria, setCriteria] = useState({
    id_conjunto_criterio: "",
    des_conjunto_criterio: "",
  });

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["conjunto-criterios-by-id", id_conjunto_criterio],
    queryFn: () => getSetOfCriteria(id_conjunto_criterio),
    enabled: !!id_conjunto_criterio, // Solo se ejecuta si id_conjunto_criterio tiene valor
  });

  // useEffect para actualizar los criterios cuando cambie el id_conjunto_criterio
  useEffect(() => {
    if (data) {
      setCriteria({
        id_conjunto_criterio: data.id_conjunto_criterio,
        des_conjunto_criterio: data.des_conjunto_criterio,
      });
    }
  }, [data]); // Se ejecuta cada vez que `data` cambie

  return (
    <div>
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error al cargar los datos: {error.message}</p>}
      {data && (
        <div>
          <p>ID Conjunto Criterio: {criteria.id_conjunto_criterio}</p>
          <p>Descripción: {criteria.des_conjunto_criterio}</p>
        </div>
      )}
    </div>
  );
};

export default GetSetOfCriteria;
