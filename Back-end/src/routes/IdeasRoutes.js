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
  .get(checkAuthWithRol(["Admin"]), getAllIdeas)
  .post(checkAuthWithRol(["Admin"]), createNewIdea);

router
  .route("/:id_proponente")
  .get(checkAuthWithRol(["Admin"]), getIdea)
  .put(checkAuthWithRol(["Admin"]), updateIdea)
  .delete(checkAuthWithRol(["Admin"]), deleteIdea);

export default router;
