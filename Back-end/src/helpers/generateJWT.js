import jwt from "jsonwebtoken";

export const generateJWT = (Id_User, userType) => {
  return jwt.sign({ Id_User: Id_User, rol: userType }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};
