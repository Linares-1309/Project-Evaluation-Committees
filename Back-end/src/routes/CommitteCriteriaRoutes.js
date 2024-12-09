import express from "express";
import {
  getAllCommitteCriteria,
  getCommitteCriteria,
} from "../controller/CommitteeCriteriaController.js";

import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const routerC = express.Router();

routerC.route("/").get(checkAuthWithRol(["Admin"]), getAllCommitteCriteria);

routerC.get("/:id_comites_evaluacion", checkAuthWithRol(["Admin"]), getCommitteCriteria)

export default routerC;
