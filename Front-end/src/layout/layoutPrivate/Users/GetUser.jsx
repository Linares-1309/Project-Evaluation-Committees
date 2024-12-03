import { getUser } from "./UsersFunctions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const GetUser = ({ Id_User, setUserSelect }) => {
  const { data } = useQuery({
    queryKey: ["user-by-id", Id_User],
    queryFn: () => getUser(Id_User),
    enabled: !!Id_User,
  });
  useEffect(() => {
    if (data) {
      setUserSelect({
        Id_User: data?.Id_User,
        username: data?.username,
        email: data?.email,
        userType: data?.userType,
      });
    }
  }, [data, setUserSelect]);
};

export default GetUser;
