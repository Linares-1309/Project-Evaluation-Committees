/* eslint-disable no-unused-vars */
import { getProponent } from "./ProponentsFunctions.jsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const GetProponents = ({ id_proponente, setProponentSelect }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["proponent-by-id", id_proponente],
    queryFn: () => getProponent(id_proponente),
    enabled: !!id_proponente,
  });
  useEffect(() => {
    if (data) {
      setProponentSelect({
        id_proponente: data?.id_proponente,
        nombres_proponente: data?.nombres_proponente,
        apellidos_proponente: data?.apellidos_proponente,
        correo_proponente: data?.correo_proponente,
        telefono_proponente: data?.telefono_proponente,
      });
    }
  }, [data, setProponentSelect]);
};

export default GetProponents;
