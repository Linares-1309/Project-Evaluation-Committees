/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { deleteProponent } from "./ProponentsFunctions";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect, useRef } from "react";

const DeleteProponents = ({
  id_proponente,
  onSuccessDel,
  setSelectedIdDelete,
}) => {
  // UseRef para evitar múltiples ejecuciones
  const isProcessing = useRef(false);

  const { mutateAsync: deleteProponentById, isLoading: isDeleting } =
    useMutation({
      mutationFn: deleteProponent,
      onSuccess: () => {
        onSuccessDel();
        Swal.fire({
          title: "¡Borrado!",
          text: "El registro ha sido eliminado con éxito.",
          icon: "success",
          confirmButtonColor: "#39a900",
          confirmButtonText: "Ok",
        }).then(() => {
          setSelectedIdDelete(null); // Restablece el estado después de cancelar
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
          setSelectedIdDelete(null); // Restablece el estado después de cancelar
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
      await deleteProponentById(id_proponente);
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
      setSelectedIdDelete(null); // Restablece el estado después de cancelar
      isProcessing.current = false; // Libera el bloqueo
    });
  };

  // Usar useEffect para ejecutar la confirmación solo cuando se reciba el id
  useEffect(() => {
    if (id_proponente && !isProcessing.current) {
      isProcessing.current = true; // Bloquea múltiples ejecuciones
      confirmDelete();
    }
  }, [id_proponente]); // Solo ejecutar cuando `id_proponente` esté disponible
};

export default DeleteProponents;
