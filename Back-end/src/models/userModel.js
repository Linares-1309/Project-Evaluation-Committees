import db from "../db/db.js";
import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";

const UserModel = db.define(
  "user",
  {
    Id_User: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    userType: { type: DataTypes.ENUM("Admin", "Calificador") },
    token: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "create_time",
    updatedAt: false,
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

UserModel.prototype.verifyPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

export default UserModel;
