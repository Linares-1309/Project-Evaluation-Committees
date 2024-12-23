// Instancia de Axios
import ClientAxios from "../../../config/AxiosConfig.jsx";

// Funcion para obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await ClientAxios("/user");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para obtener un usuario
export const getUser = async (Id_User) => {
  try {
    const response = await ClientAxios(`/user/${Id_User}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

//  Funcion para eliminar un usuario
export const deleteUser = async (Id_User) => {
  try {
    const response = await ClientAxios.delete(`/user/${Id_User}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para crear un usuario
export const createUser = async (dataUser) => {
  try {
    const response = await ClientAxios.post(
      "/user/create",
      {
        Id_User: dataUser?.idUser,
        username: dataUser?.userName,
        email: dataUser?.email,
        password: dataUser?.password,
        userType: dataUser?.userType,
      },
  
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para actualizar un usuario
export const updateUser = async (datos) => {
  try {

    const response = await ClientAxios.put(
      `/user/${datos.Id_User}`,
      datos,
  
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para actualizar la imagen de un usuario
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
