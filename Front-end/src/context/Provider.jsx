/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// Libreias
import { useState, createContext, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

// Hook de useAuth para obtener el rol del usuario
import useAuth from "../hooks/useAuth.jsx";

// LLave secreta para codificar la data que almacenamos en localStorage
const KEY_SECRET = `${import.meta.env.VITE_SECRET_KEY_LOCAL}`;

// Creamos el context
const Context = createContext();

const Provider = ({ children }) => {
  // Extraemos el rol del usuario
  const { roleUser } = useAuth();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);

  // Idea seleccionada para calificar
  const [selectedIdIdea, setSelectedIdIdeas] = useState({
    id_idea: "",
    nom_idea: "",
    estado_idea: "",
    des_idea: "",
    cal_final: "",
    nom_proponente: "",
  });

  // Comite seleccionado para ver en la tabla
  const [selectedCommitte, setSeletedCommittee] = useState({});

  // Almacenar la data en LocalStorage
  const saveToLocalStorage = (key, value) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      KEY_SECRET
    ).toString();
    localStorage.setItem(key, encryptedData);
  };

  useEffect(() => {
    // Validar que si hay data y enviarla al LocalStorage
    if (selectedIdIdea && selectedIdIdea.id_idea) {
      saveToLocalStorage("dataIdea", selectedIdIdea);

      // Navegar dependiendo del rol de usuario
      if (roleUser === "Admin") {
        navigate("/admin/comites/table");
      } else if (roleUser === "Calificador") {
        navigate("/user/comites/table");
      }
    }
    // Validar que si hay data y enviarla al LocalStorage
    if (selectedCommitte && selectedCommitte?.id_comites_evaluacion) {
      saveToLocalStorage("dataCommitte", selectedCommitte);

      // Navegar dependiendo del rol de usuario
      if (roleUser === "Admin") {
        navigate("/admin/comites/table");
      } else if (roleUser === "Calificador") {
        navigate("/user/comites/table");
      }
    }
  }, [selectedIdIdea, selectedCommitte]);

  // Si esta cargando se muestra el Loader
  if (cargando) {
    return (
      <>
        <div className="items-center align-middle flex justify-center w-full h-screen flex-col">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
          <h1 className="text-2xl font-VampiroOne font-semibold">Loading...</h1>
        </div>
      </>
    );
  }

  // Retornamos el contexto para propagar las funciones y poderlas usar en los demas conponentes
  return (
    <Context.Provider
      value={{
        selectedIdIdea,
        cargando,
        setCargando,
        setSelectedIdIdeas,
        setSeletedCommittee,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider };
export default Context;
