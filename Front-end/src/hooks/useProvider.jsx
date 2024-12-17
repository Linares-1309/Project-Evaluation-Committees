import { useContext } from "react";
import Context from "../context/Provider.jsx";


const useProvider = () => {
    return useContext(Context)
}

export default useProvider