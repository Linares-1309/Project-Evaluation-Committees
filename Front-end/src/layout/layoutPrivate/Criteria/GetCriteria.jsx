/* eslint-disable no-unused-vars */
import { getCriteria } from "./CriteriaFunctions.jsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const GetCriteria = ({ id_criterio, setCriteriaSelect }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["criterio-by-id", id_criterio],
    queryFn: () => getCriteria(id_criterio),
    enabled: !!id_criterio,
  });

  useEffect(() => {
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
