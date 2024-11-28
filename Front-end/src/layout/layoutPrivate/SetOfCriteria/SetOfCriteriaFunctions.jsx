import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllSetOfCriteria = async () => {
  try {
    const resonse = await ClientAxios("set-of-criteria/");
    if (resonse.status === 200) {
      return resonse.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const getSetOfCriteria = async (id_conjunto_criterio) => {
  try {
    const response = await ClientAxios(
      `set-of-criteria/${id_conjunto_criterio}`
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
    const response = await ClientAxios.post("set-of-criteria/", {
      des_conjunto_criterio: data_SetOfCriteria.desConjuntoCriterios,
    });
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
    const response = await ClientAxios.put(
      `set-of-criteria/${data_SetOfCriteria.id_conjunto_criterio}`,
      { des_conjunto_criterio: data_SetOfCriteria.desConjuntoCriterios }
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
    const response = await ClientAxios.delete(
      `set-of-criteria/${id_conjunto_criterio}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
