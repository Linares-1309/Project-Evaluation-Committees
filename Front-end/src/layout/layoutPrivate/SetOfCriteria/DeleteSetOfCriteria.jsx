/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { deleteSetOfCriteria } from "./SetOfCriteriaFunctions.jsx";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect, useRef } from "react";

const DeleteSetOfCriteria = ({
  id_conjunto_criterio,
  onSuccessDel,
  setSelectedIdDelete,
}) => {
  // UseRef para evitar múltiples ejecuciones
  const isProcessing = useRef(false);

  // Configuración del Mutation
  const { mutateAsync: deleteCriteria } = useMutation({
    mutationFn: deleteSetOfCriteria,
    onSuccess: () => {
      onSuccessDel(); // Refresca datos en el componente padre
      Swal.fire({
        title: "¡Borrado!",
        text: "El registro ha sido eliminado con éxito.",
        icon: "success",
        confirmButtonColor: "#39a900",
        confirmButtonText: "Ok",
      }).then(() => {
        setSelectedIdDelete(null); // Restablece el estado después del éxito
        isProcessing.current = false; // Libera el bloqueo
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar el registro.",
        icon: "error",
        confirmButtonColor: "#39a900",
        confirmButtonText: "Ok",
      }).then(() => {
        setSelectedIdDelete(null); // Restablece el estado después del error
        isProcessing.current = false; // Libera el bloqueo
      });
    },
  });

  // Confirmar eliminación
  const confirmDelete = () => {
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
        handleDelete();
      } else {
        handleCancel();
      }
    });
  };

  // Manejo de la eliminación
  const handleDelete = async () => {
    try {
      await deleteCriteria(id_conjunto_criterio);
    } catch (error) {
      console.error(error);
      isProcessing.current = false;
    }
  };

  // Manejo de la cancelación
  const handleCancel = () => {
    Swal.fire({
      title: "Cancelado!",
      text: "El registro no ha sido eliminado.",
      icon: "info",
      confirmButtonColor: "#39a900",
      confirmButtonText: "Ok",
    }).then(() => {
      setSelectedIdDelete(null); // Restablece el estado después de cancelar
      isProcessing.current = false; // Libera el bloqueo
    });
  };

  // UseEffect para manejar el flujo
  useEffect(() => {
    if (id_conjunto_criterio && !isProcessing.current) {
      isProcessing.current = true; // Bloquea múltiples ejecuciones
      confirmDelete();
    }
  }, [id_conjunto_criterio]);

  return null; // No renderiza nada
};

export default DeleteSetOfCriteria;
