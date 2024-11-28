import ClientAxios from "../../../config/AxiosConfig.jsx";

export const getAllProponents = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await ClientAxios("proponent/", config);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const getProponent = async (id_proponente) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await ClientAxios(`proponent/${id_proponente}`, config);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const createNewProponent = async (dataproponentes) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await ClientAxios.post(
      "proponent/",
      {
        id_proponente: dataproponentes?.idProponente,
        nombres_proponente: dataproponentes?.nombreProponente,
        apellidos_proponente: dataproponentes?.apellidoProponente,
        correo_proponente: dataproponentes?.correoProponente,
        telefono_proponente: dataproponentes?.telefonoProponente,
      },
      config
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};

export const updateProponent = async (dataproponentes) => {
  console.log(dataproponentes);

  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await ClientAxios.put(
      `proponent/${dataproponentes.id_proponente}`,
      {
        nombres_proponente: dataproponentes?.nombreProponente,
        apellidos_proponente: dataproponentes?.apellidoProponente,
        correo_proponente: dataproponentes?.correoProponente,
        telefono_proponente: dataproponentes?.telefonoProponente,
      },
      config
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
export const deleteProponent = async (id_proponente) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await ClientAxios(`proponent/${id_proponente}`, config);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response?.data?.msg || "Error desconocido");
  }
};
