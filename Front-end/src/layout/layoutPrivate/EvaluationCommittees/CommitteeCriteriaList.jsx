// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";

// import { getAllCommitteesCriteria } from "./EvaluationCommitteesFunctions.jsx";
// import WriteTable from "../../../tables/DataTables.jsx";
// import Alerta from "../../../components/Alerta.jsx";

// const CommitteeCriteriaList = () => {
//   const [alerta, setAlerta] = useState({});
//   const [crearDataTable, setCrearDataTable] = useState(false);

//   const { data, error, isError, isLoading } = useQuery({
//     queryKey: ["Comite-Criterios"],
//     queryFn: getAllCommitteesCriteria,
//   });

//   // Usamos useEffect para manejar las actualizaciones de alerta
//   useEffect(() => {
//     if (isLoading) {
//       setAlerta({
//         msg: "Cargando...",
//         error: false,
//       });
//     } else if (isError) {
//       setAlerta({
//         msg: error?.message?.message || "Hubo un error!",
//         error: true,
//       });
//     } else {
//       // Si la consulta es exitosa, no hay alerta
//       setAlerta({});
//       setCrearDataTable(true);
//     }
//   }, [isLoading, isError, error]);

//   const titles = [
//     "ID",
//     "Descripción del Criterio",
//     "Calificación",
//     "Acciones",
//   ];

//   return <></>;
// };

// export default CommitteeCriteriaList;
