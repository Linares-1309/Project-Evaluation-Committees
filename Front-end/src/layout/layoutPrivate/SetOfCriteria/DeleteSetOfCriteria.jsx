/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { deleteSetOfCriteria } from "./SetOfCriteriaFunctions.jsx";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect } from "react";

const DeleteSetOfCriteria = ({ id_conjunto_criterio, onSuccessDel }) => {
  // Usamos useMutation para manejar la eliminación
  const { mutateAsync: deleteCriteria, isLoading: isDeleting } = useMutation({
    mutationFn: deleteSetOfCriteria,
    onSuccess: () => {
      onSuccessDel(); // Refrescar la lista o actualizar el estado en el componente padre
      Swal.fire({
        title: "¡Borrado!",
        text: "El registro ha sido eliminado con éxito.",
        icon: "success",
        confirmButtonColor: "#39a900",
        confirmButtonText: "Ok",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar el registro.",
        icon: "error",
        confirmButtonColor: "#39a900",
        confirmButtonText: "Ok",
      });
    },
  });

  const handleDelete = async () => {
    try {
      await deleteCriteria(id_conjunto_criterio); // Realizar la eliminación
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Cancelado!",
      text: "El registro no ha sido eliminado.",
      icon: "info",
      confirmButtonColor: "#39a900",
      confirmButtonText: "Ok",
    });
  };

  // Usar useEffect para ejecutar la confirmación solo cuando se reciba el id
  useEffect(() => {
    if (id_conjunto_criterio) {
      Swal.fire({
        title: "¿Estás seguro de que quieres eliminar este registro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, borrar!",
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(); // Ejecutar la eliminación si el usuario confirma
        } else {
          handleCancel(); // Cancelar la eliminación si el usuario no confirma
        }
      });
    }
  }, [id_conjunto_criterio]); // Solo ejecutar cuando `id_conjunto_criterio` esté disponible
};

export default DeleteSetOfCriteria;
