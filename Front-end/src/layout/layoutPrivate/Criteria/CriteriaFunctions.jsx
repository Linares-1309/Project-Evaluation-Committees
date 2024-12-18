// Instancia de AXIOS
import ClientAxios from "../../../config/AxiosConfig.jsx";

// Trae todos los criteios de evaluacion
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

// Trae un criterio de evaluacion por ID
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

// Crea un nuevo criterio de evaluacion
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

// Actualiza un criterio de evaluacion
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

// Elimina un criterio de evaluacion
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
