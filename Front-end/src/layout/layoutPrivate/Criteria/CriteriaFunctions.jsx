import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllCriteria = async () => {
  try {
    const response = await ClientAxios("criteria/");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const getCriteria = async (id_criterio) => {
  try {
    const response = await ClientAxios(`criteria/${id_criterio}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const createCriteria = async (dataCriteria) => {
  try {
    const response = await ClientAxios.post("/criteria", {
      des_criterio: dataCriteria?.desCriterio,
      id_conjunto_criterio: dataCriteria?.idConjuntoCriterios,
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateCriteria = async (dataCriteria) => {
  try {
    const response = await ClientAxios.put(
      `criteria/${dataCriteria.id_criterio}`,
      {
        des_criterio: dataCriteria?.desCriterio,
        id_conjunto_criterio: dataCriteria?.idConjuntoCriterios,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
export const deleteCriteria = async (id_criterio) => {
  try {
    const response = await ClientAxios.delete(`criteria/${id_criterio}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
