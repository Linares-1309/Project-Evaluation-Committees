/* eslint-disable no-unused-vars */
// Librerias
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Componentes
import { getIdea } from "./IdeasFunctions.jsx";
import useProvider from "../../../hooks/useProvider.jsx";

// Componente para traer una idea por ID
const GetIdea = ({ id_idea, setIdeaSelect, id_idea_for_committe }) => {
  // Contexto para almacenar la idea seleccionada
  const { setSelectedIdIdeas } = useProvider();

  // Consulta para traer una idea por ID
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["idea-by-id", id_idea],
    queryFn: () => getIdea(id_idea),
    enabled: !!id_idea,
  });

  // Consulta para traer una idea por ID para el comite
  const {
    data: dataForCommitte,
    error: errorForCommitte,
    isLoading: isLoadingForCommitte,
    isError: isErrorForCommitte,
  } = useQuery({
    queryKey: ["idea-by-id-for-comitte", id_idea_for_committe],
    queryFn: () => getIdea(id_idea_for_committe),
    enabled: !!id_idea_for_committe,
  });

  useEffect(() => {
    if (data) {
      // Almacenar la idea seleccionada
      setIdeaSelect({
        id_idea: data?.id_idea,
        nom_idea: data?.nom_idea,
        estado_idea: data?.estado_idea,
        des_idea: data?.des_idea,
        cal_final: data?.cal_final,
        id_proponente: data?.id_proponente,
      });
    }
    if (dataForCommitte) {
      // Almacenar la idea seleccionada para el comite
      setSelectedIdIdeas({
        id_idea: dataForCommitte?.id_idea,
        nom_idea: dataForCommitte?.nom_idea,
        estado_idea: dataForCommitte?.estado_idea,
        des_idea: dataForCommitte?.des_idea,
        cal_final: dataForCommitte?.cal_final,
        nom_proponente:
          dataForCommitte?.proponente?.nombres_proponente +
          " " +
          dataForCommitte?.proponente?.apellidos_proponente,
      });
    }
  }, [data, dataForCommitte, setIdeaSelect, setSelectedIdIdeas]);
};

export default GetIdea;
