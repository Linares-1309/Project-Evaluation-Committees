import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllCriteria = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios("criteria/", config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const getCriteria = async (id_criterio) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios(`/${id_criterio}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const createCriteria = async (dataCriteria) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios("/", dataCriteria, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateCriteria = async (dataCriteria) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios.post(
      `/${dataCriteria.id_criterio}`,
      dataCriteria,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
export const deleteCriteria = async (id_criterio) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios(`/${id_criterio}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
