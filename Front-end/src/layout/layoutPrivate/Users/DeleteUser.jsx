/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// Librerias
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect, useRef } from "react";

// Componentes
import { deleteUser } from "./UsersFunctions.jsx";

const DeleteUser = ({ Id_User, onSuccessDel, setSelectedIdDelete }) => {
  // UseRef para evitar múltiples ejecuciones
  const isProcessing = useRef(false);

  const { mutateAsync: deleteUserById, isLoading: isDeleting } = useMutation({
    mutationFn: deleteUser,
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
      text: "¡No podrás revertir esto! ¡Se borrara toda la informacion relacionada a este registro!",
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
      await deleteUserById(Id_User); // Realizar la eliminación
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
    if (Id_User && !isProcessing.current) {
      isProcessing.current = true; // Bloquea múltiples ejecuciones
      confirmDelete();
    }
  }, [Id_User]); // Solo ejecutar cuando `Id_User` esté disponible
};

export default DeleteUser;
