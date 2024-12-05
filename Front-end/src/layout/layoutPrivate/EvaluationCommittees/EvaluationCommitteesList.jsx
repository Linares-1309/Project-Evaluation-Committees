/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import WriteTable from "../../../tables/DataTables";
import ModalWindow from "../../../components/ModalDialog";
import Alerta from "../../../components/Alerta";
import GetEvaluationCommittees from "./GetEvaluationCommittees";
import DeleteEvaluationCommittees from "./DeleteEvaluationCommittees";
import { getAllEvaluationCommittees } from "./EvaluationCommitteesFunctions";
import TableEvaluationCommittes from "./TableEvaluationCommittees";

const EvaluationCommitteesList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [textButton, setTextButton] = useState("Enviar");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TableEvaluationCommittes />
    </>
  );
};

export default EvaluationCommitteesList;
