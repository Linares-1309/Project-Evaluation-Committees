import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { logger } from "./logMiddleware.js";

// Middleware para validar el usuario y el rol
const checkAuthWithRol = (roles = []) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Este es ", req.headers.authorization);
    

    if (!token) {
      return res.status(401).json({ msg: "No se ha proporcionado un token!" });
    }
    try {
      // Verifica y decodifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const decodedIdUser = Buffer.from(decoded.Id_User, "base64").toString(
        "utf-8"
      );
      // Busca el usuario en la base de datos
      const user = await UserModel.findByPk(decodedIdUser, {
        attributes: { exclude: ["password", "email"] },
      });

      if (!user || (roles.length && !roles.includes(user.userType))) {
        return res
          .status(403)
          .json({ msg: "Acceso denegado, no tienes permisos!" });
      }
      req.user = user;
      return next();
    } catch (error) {
      // Maneja errores de token, como expiración o firma inválida
      logger.error("Token no válido o expirado", error);
      return res.status(403).json({ msg: "Token no valido o expirado" });
    }
  };
};
export default checkAuthWithRol;
