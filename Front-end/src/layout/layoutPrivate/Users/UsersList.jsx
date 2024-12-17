// Iconos del componente
import { MdDelete } from "react-icons/md";

// Librerias
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Componentes
import { getAllUsers } from "./UsersFunctions.jsx";
import WriteTable from "../../../tables/DataTables.jsx";
import ModalWindow from "../../../components/ModalDialog.jsx";
import Alerta from "../../../components/Alerta.jsx";
import DeleteUser from "./DeleteUser.jsx";
import PostUser from "./PostUser.jsx";

const UsersList = () => {
  const [alerta, setAlerta] = useState({});
  const [crearDataTable, setCrearDataTable] = useState(false);
  const [selectedIdDelete, setSelectedIdDelete] = useState(null);
  const [textButton, setTextButton] = useState("Enviar");

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const queryClient = useQueryClient();

  const handleDeleteClick = (Id_User) => {
    setSelectedIdDelete(Id_User);
  };

  // Realizamos la consulta
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["usuarios"],
    queryFn: getAllUsers,
  });

  // Usamos useEffect para manejar las actualizaciones de alerta
  useEffect(() => {
    if (isLoading) {
      setAlerta({
        msg: "Cargando...",
        error: false,
      });
    } else if (isError) {
      setAlerta({
        msg: error?.message || "Hubo un error",
        error: true,
      });
    } else {
      // Si la consulta es exitosa, no hay alerta
      setAlerta({});
      setCrearDataTable(true);
    }
  }, [isLoading, isError, error]); // Dependencias: cada vez que cambien estos valores

  // Función que se llama cuando el usuario "ADMIN" elimina un usuario
  const refreshData = () => {
    queryClient.invalidateQueries("criterios"); // Refrescar la lista de usuarios
  };

  const titleForm = ["Agregar Usuarios"];
  const titles = [
    "Documento",
    "Nombre de Usuario",
    "Correo",
    "Telefono",
    "Tipo de Usuario",
    "Acciones",
  ];

  const ButtonsForOtherModules = (Id_User) => [
    <button
      className="text-white bg-red-600 hover:bg-red-700 p-1 rounded flex items-center font-semibold text-xs px-2"
      key="delete"
      title="Eliminar"
      onClick={() => handleDeleteClick(Id_User)}
    >
      <MdDelete className="mr-1" /> Eliminar
    </button>,
  ];

  const users = data?.users || [];

  const formattedData = users.map((user) => {
    const rowData = [
      user?.Id_User,
      user?.fullName,
      user?.email,
      user?.phoneNumber,
      user?.userType,
    ];
    rowData.push(ButtonsForOtherModules(user?.Id_User));

    return rowData;
  });

  const updateTextButton = (text) => {
    setTextButton(text);
  };

  return (
    <>
      <h1 className="font-RobotoSlab font-semibold uppercase text-2xl">
        Usuarios
      </h1>
      <ModalWindow
        toggleModal={toggleModal}
        isOpen={isOpen}
        form={<PostUser textButton={textButton} onSuccessSave={refreshData} />}
        titleForm={titleForm}
        updateTextButton={updateTextButton}
      />
      {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta} />}
      {crearDataTable && <WriteTable titles={titles} data={formattedData} />}
      {selectedIdDelete && (
        <DeleteUser
          Id_User={selectedIdDelete}
          onSuccessDel={refreshData}
          setSelectedIdDelete={setSelectedIdDelete}
        />
      )}
    </>
  );
};

export default UsersList;
