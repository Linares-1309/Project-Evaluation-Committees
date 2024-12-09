import ClientAxios from "../../../config/AxiosConfig.jsx";

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

export const deleteEvaluationCommitte = async (id_comités_evaluación) => {
  try {
    const response = await ClientAxios.delete(
      `/evaluation-committees/${id_comités_evaluación}`
    );
    if (response.status  === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};