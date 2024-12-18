// Instancia de Axios
import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await ClientAxios("/user", config);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const getUser = async (Id_User) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await ClientAxios(`/user/${Id_User}`, config);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const deleteUser = async (Id_User) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await ClientAxios.delete(`/user/${Id_User}`, config);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const createUser = async (dataUser) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await ClientAxios.post(
      "/user/create",
      {
        Id_User: dataUser?.idUser,
        username: dataUser?.userName,
        email: dataUser?.email,
        password: dataUser?.password,
        userType: dataUser?.userType,
      },
      config
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateUser = async (datos) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await ClientAxios.put(
      `/user/${datos.Id_User}`,
      datos,
      config
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateImageUser = async ({ formData, Id_User }) => {
  try {
    const response = await ClientAxios.put(
      `/user/updateImage/${Id_User}`,
      formData
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
