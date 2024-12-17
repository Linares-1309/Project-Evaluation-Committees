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
  .get(checkAuthWithRol(["Admin", "Calificador"]), getAllEvaluationCommittees)
  .post(checkAuthWithRol(["Admin", "Calificador"]), newEvaluationCommitte);

router
  .route("/:id_comites_evaluacion")
  .get(checkAuthWithRol(["Admin", "Calificador"]), getEvaluationCommitte)
  .put(checkAuthWithRol(["Admin"]), updateEvaluationCommitte)
  .delete(checkAuthWithRol(["Admin"]), deleteEvaluationCommitte);

export default router;
