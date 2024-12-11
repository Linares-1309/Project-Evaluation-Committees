/* eslint-disable no-unused-vars */
import { getEvaluationCommitte } from "./EvaluationCommitteesFunctions.jsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useIdeas from "../../../hooks/useIdeas.jsx";

const GetEvaluationCommittees = ({ setCommitteeSelect, id_comite }) => {
  const { setSeletedCommittee } = useIdeas();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["committe-for-table", id_comite],
    queryFn: () => getEvaluationCommitte(id_comite),
    enabled: !!id_comite,
  });

  useEffect(() => {
    if (data) {
      console.log(data.EvaluationCommitte);
      
      setSeletedCommittee(data.EvaluationCommitte)
    }
  });
};

export default GetEvaluationCommittees;
