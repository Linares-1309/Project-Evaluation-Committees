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