/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, createContext, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
const KEY_SECRET = `${import.meta.env.VITE_SECRET_KEY_LOCAL}`;

const IdeasContext = createContext();

const IdeasProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [selectedIdIdea, setSeletedIdIdeas] = useState({
    id_idea: "",
    nom_idea: "",
    estado_idea: "",
    des_idea: "",
    cal_final: "",
    nom_proponente: "",
  });
  const [selectedCommitte, setSeletedCommittee] = useState({});

  const saveToLocalStorage = (key, value) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      KEY_SECRET
    ).toString();
    localStorage.setItem(key, encryptedData);
  };

  useEffect(() => {
    if (selectedIdIdea && selectedIdIdea.id_idea) {
      saveToLocalStorage("dataIdea", selectedIdIdea);
      navigate("/admin/comites/table");
    }
    if (selectedCommitte && selectedCommitte?.id_comites_evaluación) {
      saveToLocalStorage("dataCommitte", selectedCommitte);
      navigate("/admin/comites/table");
    }
  }, [selectedIdIdea, selectedCommitte]);

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
          <h1 className="text-2xl font-serif font-semibold">Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <IdeasContext.Provider
      value={{
        selectedIdIdea,
        setSeletedIdIdeas,
        cargando,
        setCargando,
        setSeletedCommittee,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
};

export { IdeasProvider };
export default IdeasContext;
