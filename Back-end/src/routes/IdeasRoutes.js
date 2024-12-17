import express from "express";
import {
    getAllIdeas,
    getIdea,
    createNewIdea,
    updateIdea,
    deleteIdea,
} from "../controller/IdeaController.js";

// Verifica el usuario y el rol de dicho usuario
import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const router = express.Router();

//Area Privada
router
  .route("/")
  .get(checkAuthWithRol(["Admin", "Calificador"]), getAllIdeas)
  .post(checkAuthWithRol(["Admin"]), createNewIdea);

router
  .route("/:id_idea")
  .get(checkAuthWithRol(["Admin", "Calificador"]), getIdea)
  .put(checkAuthWithRol(["Admin"]), updateIdea)
  .delete(checkAuthWithRol(["Admin"]), deleteIdea);

export default router;
