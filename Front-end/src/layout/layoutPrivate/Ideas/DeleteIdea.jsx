/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { deleteIdea } from "./IdeasFunctions";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect, useRef } from "react";

const DeleteIdea = ({ id_idea, onSuccessDel, setSelectedIdDelete }) => {
  // UseRef para evitar múltiples ejecuciones
  const isProcessing = useRef(false);

  const { mutateAsync: deleteIdeaById, isLoading: isDeleting } = useMutation({
    mutationFn: deleteIdea,
    onSuccess: () => {
      onSuccessDel();
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
        setSelectedIdDelete(null); // Restablece el estado después del éxito
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

  const handleDelete = async () => {
    try {
      await deleteIdeaById(id_idea); // Realizar la eliminación
    } catch (error) {
      console.error(error);
      isProcessing.current = false;
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Cancelado!",
      text: "El registro no ha sido eliminado.",
      icon: "info",
      confirmButtonColor: "#39a900",
      confirmButtonText: "Ok",
    }).then(() => {
      setSelectedIdDelete(null); // Restablece el estado después del éxito
      isProcessing.current = false; // Libera el bloqueo
    });
  };

  // Usar useEffect para ejecutar la confirmación solo cuando se reciba el id
  useEffect(() => {
    if (id_idea && !isProcessing.current) {
      isProcessing.current = true; // Bloquea múltiples ejecuciones
      confirmDelete();
    }
  }, [id_idea]); // Solo ejecutar cuando `id_idea` esté disponible
};

export default DeleteIdea;
