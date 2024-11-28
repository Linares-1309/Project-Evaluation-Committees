import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createNewIdea, updateIdea } from "./IdeasFunctions";
import { getAllProponents } from "../Proponents/ProponentsFunctions";
import Alerta from "../../../components/Alerta";
import { BsFillSendFill } from "react-icons/bs";

const PostIdeas = ({ ideaSelect, textButton, onSuccessSave }) => {
  const [idIdea, setIdIdea] = useState("");
  const [nombreIdea, setNombreIdea] = useState("");
  const [descripcionIdea, setDescripcionIdea] = useState("");
  const [idProponente, setIdProponente] = useState("");
  const [alerta, setAlerta] = useState({});
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [proponentes, setProponente] = useState([]);

  const {
    data,
    error,
    isError,
    isLoading: loading,
  } = useQuery({
    queryKey: ["proponents-for-ideas"],
    queryFn: getAllProponents,
  });
  useEffect(() => {
    if (loading) {
        setAlerta({
            msg: "Cargando...",
            error: false
        })
    }
  })

  return <div></div>;
};

export default PostIdeas;
