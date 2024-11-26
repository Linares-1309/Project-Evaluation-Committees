import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllSetOfCriteria = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resonse = await ClientAxios("set-of-criteria/", config);
    if (resonse.status === 200) {
      return resonse.data;
    }
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
    const response = await ClientAxios(
      `set-of-criteria/${id_conjunto_criterio}`,
      config
    );
    if (response.status === 200) {
      return response.data;
    }
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
    const response = await ClientAxios.post(
      "set-of-criteria/",
      { des_conjunto_criterio: data_SetOfCriteria.desConjuntoCriterios },
      config
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
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
    const response = await ClientAxios.post(
      `set-of-criteria/${data_SetOfCriteria.id_conjunto_criterio}`,
      data_SetOfCriteria,
      config
    );
    if (response.status === 200) {
      return response.data;
    }
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
    const response = await ClientAxios.delete(
      `set-of-criteria/${id_conjunto_criterio}`,
      config
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
