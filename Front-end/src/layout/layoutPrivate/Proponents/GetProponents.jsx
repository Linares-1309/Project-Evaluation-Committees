/* eslint-disable no-unused-vars */
// Librerias
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Componentes
import { getProponent } from "./ProponentsFunctions.jsx";

const GetProponents = ({ id_proponente, setProponentSelect }) => {
  // Consulta para traer un proponente por ID
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["proponent-by-id", id_proponente],
    queryFn: () => getProponent(id_proponente),
    enabled: !!id_proponente,
  });
  useEffect(() => {
    if (data) {
      // Almacenar el proponente seleccionado
      setProponentSelect({
        id_proponente: data?.id_proponente,
        nombres_proponente: data?.nombres_proponente,
        apellidos_proponente: data?.apellidos_proponente,
        correo_proponente: data?.correo_proponente,
        telefono_proponente: data?.telefono_proponente,
      });
    }
  }, [data, setProponentSelect]); // Se ejecuta cuando estos esten disponibles
};

export default GetProponents;
