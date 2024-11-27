/* eslint-disable react/prop-types */
import { getCriteria } from "./CriteriaFunctions.jsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const GetCriteria = ({ id_criterio, setCriteriaSelect }) => {
  // const [criteria, setCriteriaSelect] = useState({
  //   id_criterio: "",
  //   des_criterio: "",
  //   id_conjunto_criterio: "",
  // });

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["criterio-by-id", id_criterio],
    queryFn: () => getCriteria(id_criterio),
    enabled: !!id_criterio,
  });

  useEffect(() => {
    if (data) {
      setCriteriaSelect({
        id_criterio: data?.id_criterio,
        des_criterio: data?.des_criterio,
        id_conjunto_criterio: data?.id_conjunto_criterio,
      });
    }
  }, [data, setCriteriaSelect]);
  return (
    <>
      {" "}
      {isLoading && <p>Cargando...</p>}
      {isError && <p>Error al cargar los datos: {error.message}</p>}
      {data && (
        <div>
          <h1>H</h1>
          {/* <p>ID Criterio: {criteria.id_criterio}</p>
          <p>Descripción: {criteria.des_criterio}</p>
          <p>ID C CRITERIO: {criteria.id_conjunto_criterio}</p> */}
        </div>
      )}
    </>
  );
};

export default GetCriteria;
