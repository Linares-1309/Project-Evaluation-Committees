import express from "express";
import {
    getAllEvaluationCommittees,
    getEvaluationCommitte,
    newEvaluationCommitte,
    updateEvaluationCommitte,
    deleteEvaluationCommitte,
} from "../controller/EvaluationCommitteesController.js";

// Verifica el usuario y el rol de dicho usuario
import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const router = express.Router();

//Area Privada
router
  .route("/")
  .get(checkAuthWithRol(["Admin"]), getAllEvaluationCommittees)
  .post(checkAuthWithRol(["Admin"]), newEvaluationCommitte);

router
  .route("/:id_proponente")
  .get(checkAuthWithRol(["Admin"]), getEvaluationCommitte)
  .put(checkAuthWithRol(["Admin"]), updateEvaluationCommitte)
  .delete(checkAuthWithRol(["Admin"]), deleteEvaluationCommitte);

export default router;
