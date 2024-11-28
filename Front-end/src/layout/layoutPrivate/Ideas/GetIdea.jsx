/* eslint-disable no-unused-vars */
import { getIdea } from "./IdeasFunctions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const GetIdea = ({ id_idea, setIdeaSelect }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["idea-by-id", id_idea],
    queryFn: () => getIdea(id_idea),
    enabled: !!id_idea,
  });

  useEffect(() => {
    if (data) {
      setIdeaSelect({
        id_idea: data?.id_idea,
        nom_idea: data?.nom_idea,
        estado_idea: data?.estado_idea,
        des_idea: data?.des_idea,
        cal_final: data?.cal_final,
        id_proponente: data?.id_proponente,
      });
    }
  }, [data, setIdeaSelect]);
};

export default GetIdea;
