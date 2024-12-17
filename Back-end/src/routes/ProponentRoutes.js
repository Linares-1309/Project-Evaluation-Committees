import express from "express";
import {
  getAllProponents,
  getProponent,
  createNewProponent,
  updateProponent,
  deleteProponent,
} from "../controller/ProponentController.js";

// Verifica el usuario y el rol de dicho usuario
import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const router = express.Router();

//Area Privada
router
  .route("/")
  .get(checkAuthWithRol(["Admin", "Calificador"]), getAllProponents)
  .post(checkAuthWithRol(["Admin"]), createNewProponent);

router
  .route("/:id_proponente")
  .get(checkAuthWithRol(["Admin"]), getProponent)
  .put(checkAuthWithRol(["Admin"]), updateProponent)
  .delete(checkAuthWithRol(["Admin"]), deleteProponent);

export default router;
