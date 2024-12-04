import express from "express";
import { getAllRubrics, createRubrica } from "../controller/RubricController.js";

// Verifica el usuario y el rol de dicho usuario
import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const router = express.Router();

//Area Privada
router
  .route("/")
  .get(checkAuthWithRol(["Admin"]), getAllRubrics)
  .post(checkAuthWithRol(["Admin"]), createRubrica);

// router
//   .route("/:id_criterio")
//   .get(checkAuthWithRol(["Admin"]), getCriteria)
//   .put(checkAuthWithRol(["Admin"]), updateCriteria)
//   .delete(checkAuthWithRol(["Admin"]), deleteCriteria);

export default router;
