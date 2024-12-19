/* eslint-disable no-unused-vars */
// Librerias
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Componentes
import { getCriteria } from "./CriteriaFunctions.jsx";

const GetCriteria = ({ id_criterio, setCriteriaSelect }) => {
  // Consulta para traer un criterio de evaluacion por ID
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["criterio-by-id", id_criterio],
    queryFn: () => getCriteria(id_criterio),
    enabled: !!id_criterio,
  });

  useEffect(() => {
    if (data) {
      // Almacenar el criterio seleccionado
      setCriteriaSelect({
        id_criterio: data?.id_criterio,
        des_criterio: data?.des_criterio,
        id_conjunto_criterio: data?.id_conjunto_criterio,
      });
    }
  }, [data, setCriteriaSelect]); // Se ejecuta cuando estos esten disponibles
};

export default GetCriteria;
