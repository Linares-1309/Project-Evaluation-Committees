// Axios instance
import ClientAxios from "../../../config/AxiosConfig.jsx";

// Function to login
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

// Function to forgot password
export const forgotPassword = async (email) => {
  try {
    const response = await ClientAxios.post(`/user/forgot-password`, {
      email: email,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Function to verify token
export const verifyToken = async (token) => {
  try {
    const response = await ClientAxios(`/user/forgot-password/${token}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Function to change password
export const newPassword = async (datos) => {
  try {
    const response = await ClientAxios.post(
      `/user/forgot-password/${datos.token}`,
      {
        password: datos.password,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
