// Instancia de Axios
import ClientAxios from "../../../config/AxiosConfig.jsx";

// Funcion para obtener todos los criterios de los comites de evaluacion
export const getAllCommitteesCriteria = async () => {
  try {
    const response = await ClientAxios("/committe-criterias/");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para obtener un criterio de un comite de evaluacion
export const getCommitteCriteria = async (id_comites_evaluacion) => {
  try {
    const response = await ClientAxios(
      `/committe-criterias/${id_comites_evaluacion}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para obtener todos los comites de evaluacion
export const getAllEvaluationCommittees = async () => {
  try {
    const response = await ClientAxios("/evaluation-committees/");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para obtener un comite de evaluacion
export const getEvaluationCommitte = async (id_comités_evaluación) => {
  try {
    const response = await ClientAxios(
      `/evaluation-committees/${id_comités_evaluación}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para crear un comite de evaluacion
export const newEvaluationCommitte = async (dataEvaluatioCommittees) => {
  try {
    const response = await ClientAxios.post(
      "/evaluation-committees/",
      dataEvaluatioCommittees
    );
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para actualizar un comite de evaluacion
export const updateEvaluationCommitte = async (dataEvaluatioCommittees) => {
  try {
    const response = await ClientAxios.put(
      `/${dataEvaluatioCommittees.id_comités_evaluación}`,
      dataEvaluatioCommittees
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Funcion para eliminar un comite de evaluacion
export const deleteEvaluationCommitte = async (id_comités_evaluación) => {
  try {
    const response = await ClientAxios.delete(
      `/evaluation-committees/${id_comités_evaluación}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
