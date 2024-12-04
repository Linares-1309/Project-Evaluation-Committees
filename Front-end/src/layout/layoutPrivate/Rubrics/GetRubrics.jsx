/* eslint-disable no-unused-vars */
import { getRubric } from "./RubricsFunction.jsx"
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const GetRubrics = ({ id_rubricas, setRubricSelect}) => {  
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["rubric-by-id", id_rubricas],
    queryFn: () => getRubric(id_rubricas),
    enabled: !!id_rubricas
  })

  useEffect(() => {
    if (data) {
      setRubricSelect({
        id_rubricas: data?.id_rubricas,
        des_rubricas: data?.des_rubricas,
        id_criterio: data?.id_criterio,
      });
    }
  }, [data, setRubricSelect]);
}

export default GetRubrics
