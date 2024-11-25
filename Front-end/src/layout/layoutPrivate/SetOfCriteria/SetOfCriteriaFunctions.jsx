import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllSetOfCriteria = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios("set-of-criteria/", config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const getSetOfCriteria = async (id_conjunto_criterio) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios(
      `set-of-criteria/${id_conjunto_criterio}`,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const createNewSetOfCriteria = async (data_SetOfCriteria) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios(
      "set-of-criteria/",
      data_SetOfCriteria,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateSetOfCriteria = async (data_SetOfCriteria) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios.post(
      `set-of-criteria/${data_SetOfCriteria.id_conjunto_criterio}`,
      data_SetOfCriteria,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
export const deleteSetOfCriteria = async (id_conjunto_criterio) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios(`set-of-criteria/${id_conjunto_criterio}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
