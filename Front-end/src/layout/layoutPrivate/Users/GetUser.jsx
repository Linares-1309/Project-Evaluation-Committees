// Librerias
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Componentes
import useProvider from "../../../hooks/useProvider.jsx";
import { getUser } from "./UsersFunctions.jsx";

const GetUser = () => {
  // Custom hook para usar el provider
  const { setUserSelect, selectedIdEdit } = useProvider();

  // Obtener el usuario
  const { data } = useQuery({
    queryKey: ["user-by-id", selectedIdEdit],
    queryFn: () => getUser(selectedIdEdit),
    enabled: !!selectedIdEdit,
  });
  // Use effect para setear el usuario seleccionado
  useEffect(() => {
    if (data) {
      setUserSelect({
        Id_User: data?.user?.Id_User,
        username: data?.user?.username,
        email: data?.user?.email,
        userType: data?.user?.userType,
      });
    }
  }, [data, setUserSelect]);
};

export default GetUser;
