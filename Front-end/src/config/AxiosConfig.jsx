import axios from "axios";

// Crear una instancia de Axios
const ClientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  timeout: 10000,
});

// Interceptor para agregar el token y manejar `Content-Type`
ClientAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Detectar si se está enviando FormData
    if (config.data instanceof FormData) {
      // Deja que el navegador configure automáticamente el Content-Type
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ClientAxios;
