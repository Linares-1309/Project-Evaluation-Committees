import express from "express";
import { getAllCommitteCriteria } from "../controller/CommitteeCriteriaController.js";

import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

const router = express.Router();

router.route("/").get(checkAuthWithRol(["Admin"]), getAllCommitteCriteria);

export default router;
