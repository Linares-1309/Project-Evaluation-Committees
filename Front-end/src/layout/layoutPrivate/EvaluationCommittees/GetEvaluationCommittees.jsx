/* eslint-disable no-unused-vars */
import { getEvaluationCommitte } from "./EvaluationCommitteesFunctions.jsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useProvider from "../../../hooks/useProvider.jsx";

const GetEvaluationCommittees = ({ setCommitteeSelect, id_comite }) => {
  const { setSeletedCommittee } = useProvider();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["committe-for-table", id_comite],
    queryFn: () => getEvaluationCommitte(id_comite),
    enabled: !!id_comite,
  });

  useEffect(() => {
    if (data) {      
      setSeletedCommittee(data.EvaluationCommitte)
    }
  });
};

export default GetEvaluationCommittees;
