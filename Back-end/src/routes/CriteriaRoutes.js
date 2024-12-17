import express from "express";
import {
  getAllCriteria,
  getCriteria,
  createCriteria,
  updateCriteria,
  deleteCriteria,
} from "../controller/CriteriaController.js";

// Verifica el usuario y el rol de dicho usuario
import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const router = express.Router();

//Area Privada
router
  .route("/")
  .get(checkAuthWithRol(["Admin", "Calificador"]), getAllCriteria)
  .post(checkAuthWithRol(["Admin"]), createCriteria);

router
  .route("/:id_criterio")
  .get(checkAuthWithRol(["Admin"]), getCriteria)
  .put(checkAuthWithRol(["Admin"]), updateCriteria)
  .delete(checkAuthWithRol(["Admin"]), deleteCriteria);

export default router;
