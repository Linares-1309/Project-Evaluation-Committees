import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllEvaluationCommittees = async () => {
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

export const getEvaluationCommitte = async (id_comités_evaluación) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios(`/${id_comités_evaluación}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const newEvaluationCommitte = async (dataEvaluatioCommittees) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios("/", dataEvaluatioCommittees, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateEvaluationCommitte = async (dataEvaluatioCommittees) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios.post(
      `/${dataEvaluatioCommittees.id_comités_evaluación}`,
      dataEvaluatioCommittees,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
export const deleteEvaluationCommitte = async (id_comités_evaluación) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await ClientAxios(`/${id_comités_evaluación}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
