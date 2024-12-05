import { useContext } from "react";
import IdeasContext from "../context/IdeasProvider.jsx";


const useIdeas = () => {
    return useContext(IdeasContext)
}

export default useIdeas