/* eslint-disable no-unused-vars */
// Librerias
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Componentes
import { getCriteria } from "./CriteriaFunctions.jsx";

const GetCriteria = ({ id_criterio, setCriteriaSelect }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["criterio-by-id", id_criterio],
    queryFn: () => getCriteria(id_criterio),
    enabled: !!id_criterio,
  });

  useEffect(() => {
    console.log(data);
    
    if (data) {
      setCriteriaSelect({
        id_criterio: data?.id_criterio,
        des_criterio: data?.des_criterio,
        id_conjunto_criterio: data?.id_conjunto_criterio,
      });
    }
  }, [data, setCriteriaSelect]);
};

export default GetCriteria;
