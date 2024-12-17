import express from "express";
import { getAllRubrics, createRubrica, updateRubric, getRubric, deleteRubric } from "../controller/RubricController.js";

// Verifica el usuario y el rol de dicho usuario
import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const router = express.Router();

//Area Privada
router
  .route("/")
  .get(checkAuthWithRol(["Admin", "Calificador"]), getAllRubrics)
  .post(checkAuthWithRol(["Admin"]), createRubrica);

router
  .route("/:id_rubricas")
  .get(checkAuthWithRol(["Admin"]), getRubric)
  .put(checkAuthWithRol(["Admin"]), updateRubric)
  .delete(checkAuthWithRol(["Admin"]), deleteRubric);

export default router;
