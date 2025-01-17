// Instancia de AXIOS
import ClientAxios from "../../../config/AxiosConfig.jsx";

// Trae todos los proponentes
export const getAllProponents = async () => {
  try {
    const response = await ClientAxios("/proponent");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Trae un proponente por ID
export const getProponent = async (id_proponente) => {
  try {
    const response = await ClientAxios(`/proponent/${id_proponente}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Crea un nuevo proponente
export const createNewProponent = async (dataproponentes) => {
  try {
    const response = await ClientAxios.post("/proponent/", {
      id_proponente: dataproponentes?.idProponente,
      nombres_proponente: dataproponentes?.nombreProponente,
      apellidos_proponente: dataproponentes?.apellidoProponente,
      correo_proponente: dataproponentes?.correoProponente,
      telefono_proponente: dataproponentes?.telefonoProponente,
    });
    if (response.status === 201) {
      return response.data
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Actualiza un proponente
export const updateProponent = async (dataproponentes) => {
  try {
    const response = await ClientAxios.put(
      `/proponent/${dataproponentes.id_proponente}`,
      {
        nombres_proponente: dataproponentes?.nombreProponente,
        apellidos_proponente: dataproponentes?.apellidoProponente,
        correo_proponente: dataproponentes?.correoProponente,
        telefono_proponente: dataproponentes?.telefonoProponente,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

// Elimina un proponente
export const deleteProponent = async (id_proponente) => {
  try {
    const response = await ClientAxios.delete(`/proponent/${id_proponente}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
