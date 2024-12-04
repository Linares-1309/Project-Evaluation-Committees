import ClientAxios from "../../../config/AxiosConfig";

export const getAllRubrics = async () => {
  try {
    const response = await ClientAxios("rubrics/");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const getRubric = async (id_rubricas) => {
  try {
    const response = await ClientAxios(`rubrics/${id_rubricas}`);
    if (response.status === 200) {   
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const createRubrics = async (dataRubrics) => {
  try {
    const response = await ClientAxios.post("/rubrics", {
      des_rubricas: dataRubrics?.desRubric,
      id_criterio: dataRubrics?.idCriterio,
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateRubrics = async (dataRubrics) => {
  console.log(dataRubrics);
  
  try {
    const response = await ClientAxios.put(
      `rubrics/${dataRubrics.id_rubricas}`,
      {
        des_rubricas: dataRubrics?.desRubric,
        id_criterio: dataRubrics?.idCriterio,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const deleteRubric = async (rubrics) => {
  try {
    const response = await ClientAxios.delete(`criteria/${rubrics}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
