/* eslint-disable no-unused-vars */

// Libraries
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Components and functions
import { getEvaluationCommitte } from "./EvaluationCommitteesFunctions.jsx";
import useProvider from "../../../hooks/useProvider.jsx";

// Get evaluation committees
const GetEvaluationCommittees = ({ id_comite }) => {
  // Custom hook to use the provider
  const { setSeletedCommittee } = useProvider();

  // Get the evaluation committee
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["committe-for-table", id_comite],
    queryFn: () => getEvaluationCommitte(id_comite),
    enabled: !!id_comite,
  });

  // Use effect to set the selected committee
  useEffect(() => {
    if (data) {
      setSeletedCommittee(data.EvaluationCommitte);
    }
  });
};

export default GetEvaluationCommittees;
