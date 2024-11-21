import express from "express";
import {
  getAllSetOfCriteria,
  getSetOfCriteria,
  createSetOfCriteria,
  updateSetOfCriteria,
  deleteSetOfCriteria,
} from "../controller/SetOfCriteriaController.js";

// Verifica el usuario y el rol de dicho usuario
import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const router = express.Router();

//Area Privada
router
  .route("/")
  .get(checkAuthWithRol(["Admin"]), getAllSetOfCriteria)
  .post(checkAuthWithRol(["Admin"]), createSetOfCriteria);

router
  .route("/:id_conjunto_criterio")
  .get(checkAuthWithRol(["Admin"]), getSetOfCriteria)
  .put(checkAuthWithRol(["Admin"]), updateSetOfCriteria)
  .delete(checkAuthWithRol(["Admin"]), deleteSetOfCriteria);

export default router;
