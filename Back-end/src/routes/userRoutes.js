import express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  login,
  createUser,
  profile,
  forgotPassword,
  verifyToken,
  newPassword,
} from "../controller/userController.js";
// Verifica el usuario y el rol de dicho usuario
import checkAuthWithRol from "../middleware/checkAuthWithRol.js";

// Verifica solamente el usuario sin importar el rol
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Area Publica
router.post("/login", login);
router.post("/create", checkAuthWithRol(["Admin"]), createUser);
router.post("/forgot-password", forgotPassword);
router.route("/forgot-password/:token").get(verifyToken).post(newPassword);

//Area Privada
router.get("/", checkAuthWithRol(["Admin"]), getAllUsers);
router
  .route("/:Id_User")
  .get(checkAuthWithRol(["Admin"]), getUser)
  .delete(checkAuthWithRol(["Admin"]), deleteUser)
  .put(checkAuth, updateUser);
router.get("/profileUser", profile);

export default router;
