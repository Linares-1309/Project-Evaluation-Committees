import ClientAxios from "../../../config/AxiosConfig";

// export const getAllUsers = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await ClientAxios("/user", config);
//     return data;
//   } catch (error) {
//     throw new Error(error.response?.data?.msg || "Error desconocido");
//   }
// };

// export const getUser = async (Id_User) => {
//   try {
//     const token = localStorage.getItem("token");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await ClientAxios(`/user/${Id_User}`, config);
//     return data;
//   } catch (error) {
//     throw new Error(error.response?.data?.msg || "Error desconocido");
//   }
// };

// export const deleteUser = async (Id_User) => {
//   try {
//     const token = localStorage.getItem("token");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await ClientAxios.delete(`/user/${Id_User}`, config);
//     return data;
//   } catch (error) {
//     throw new Error(error.response?.data?.msg || "Error desconocido");
//   }
// };

// export const updateUser = async (datos) => {
//   try {
//     const token = localStorage.getItem("token");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { data } = await ClientAxios.update(
//       `/user/${datos.Id_User}`,
//       { username: datos.username },
//       config
//     );
//     return data;
//   } catch (error) {
//     throw new Error(error.response?.data?.msg || "Error desconocido");
//   }
// };

export const loginUser = async (credentials) => {

  try {
    const response = await ClientAxios.post("/user/login", credentials);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await ClientAxios.post(`/user/forgot-password`, {
      email: email,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const verifyToken = async (token) => {
  try {
    const { data } = await ClientAxios(`/user/forgot-password/${token}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const newPassword = async (datos) => {
  try {
    const { data } = await ClientAxios.post(
      `/user/forgot-password/${datos.token}`,
      {
        password: datos.password,
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
