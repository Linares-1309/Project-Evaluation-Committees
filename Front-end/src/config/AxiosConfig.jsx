import axios from "axios";

// Crear una instancia de Axios
const ClientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
export default ClientAxios;
