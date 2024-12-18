/* eslint-disable no-unused-vars */
import { getSetOfCriteria } from "./SetOfCriteriaFunctions.jsx";
import { useQuery } from "@tanstack/react-query";
import {  useEffect } from "react";

const GetSetOfCriteria = ({ id_conjunto_criterio, setSetOfCriteriaSelect }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["conjunto-criterios-by-id", id_conjunto_criterio],
    queryFn: () => getSetOfCriteria(id_conjunto_criterio),
    enabled: !!id_conjunto_criterio, // Solo se ejecuta si id_conjunto_criterio tiene valor
  });

  // useEffect para actualizar los criterios cuando cambie el id_conjunto_criterio
  useEffect(() => {
    if (data) {
      setSetOfCriteriaSelect({
        id_conjunto_criterio: data.id_conjunto_criterio,
        des_conjunto_criterio: data.des_conjunto_criterio,
      });
    }
  }, [data, setSetOfCriteriaSelect]); // Se ejecuta cada vez que `data` cambie
};

export default GetSetOfCriteria;
