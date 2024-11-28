import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllEvaluationCommittees = async () => {
  try {
    const { data } = await ClientAxios("/");
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const getEvaluationCommitte = async (id_comités_evaluación) => {
  try {
    const { data } = await ClientAxios(`/${id_comités_evaluación}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const newEvaluationCommitte = async (dataEvaluatioCommittees) => {
  try {
    const { data } = await ClientAxios("/", dataEvaluatioCommittees);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateEvaluationCommitte = async (dataEvaluatioCommittees) => {
  try {
    const { data } = await ClientAxios.post(
      `/${dataEvaluatioCommittees.id_comités_evaluación}`,
      dataEvaluatioCommittees,
  
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
export const deleteEvaluationCommitte = async (id_comités_evaluación) => {
  try {
    const { data } = await ClientAxios(`/${id_comités_evaluación}`);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
