// Librerias
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

// Componentes
import useProvider from "../../../hooks/useProvider.jsx";
import { getUser } from "./UsersFunctions.jsx";

const GetUser = () => {
  const { setUserSelect, selectedIdEdit } = useProvider();

  const { data } = useQuery({
    queryKey: ["user-by-id", selectedIdEdit],
    queryFn: () => getUser(selectedIdEdit),
    enabled: !!selectedIdEdit,
  });
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
