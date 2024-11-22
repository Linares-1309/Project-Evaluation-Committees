import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllProponents = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios("/", config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const getProponent = async (id_proponente) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios(`/${id_proponente}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const createNewProponent = async (dataproponentes) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios("/", dataproponentes, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateProponent = async (dataproponentes) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios.post(
      `/${dataproponentes.id_proponente}`,
      dataproponentes,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
export const deleteProponent = async (id_proponente) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios(`/${id_proponente}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
