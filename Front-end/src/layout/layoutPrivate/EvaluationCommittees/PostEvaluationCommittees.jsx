import { useMutation } from "@tanstack/react-query";
import { newEvaluationCommitte } from "./EvaluationCommitteesFunctions";
import Alerta from "../../../components/Alerta";
import { useState } from "react";

const PostEvaluationCommittees = ({ ...props }) => {
  const [alerta, setAlerta] = useState({});

  const { mutate, isError, isLoading } = useMutation({
    mutationFn: newEvaluationCommitte,
    onSuccess: (data) => {
      setAlerta({
        msg: data.msg,
        error: false,
      });
    },
    onError: (error) => {
      setAlerta({
        msg: error.message,
        error: true,
      });
    },
  });
  return <div></div>;
};

export default PostEvaluationCommittees;
