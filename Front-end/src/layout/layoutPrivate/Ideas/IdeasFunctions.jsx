// Instancia de AXIOS
import ClientAxios from "../../../config/AxiosConfig.jsx";

// Trae todas las ideas
export const getAllIdeas = async () => {
  try {
    const response = await ClientAxios("/ideas/");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

//  Trae una idea por ID
export const getIdea = async (id_idea) => {
  try {
    const response = await ClientAxios(`/ideas/${id_idea}`);
    if (response.status === 200) {
      
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Crea una nueva idea
export const createNewIdea = async (dataideas) => {
  try {
    const response = await ClientAxios.post("/ideas/", {
      id_idea: dataideas?.idIdea,
      nom_idea: dataideas?.nombreIdea,
      des_idea: dataideas?.descripcionIdea,
      id_proponente: dataideas?.idProponente
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Actualiza una idea
export const updateIdea = async (dataideas) => {
  try {
    const response = await ClientAxios.put(`/ideas/${dataideas.id_idea}`, dataideas);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Elimina una idea
export const deleteIdea = async (id_idea) => {
  try {
    const response = await ClientAxios.delete(`/ideas/${id_idea}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
