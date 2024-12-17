import db from "../db/db.js";
import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";

const UserModel = db.define(
  "user",
  {
    Id_User: { type: DataTypes.INTEGER, primaryKey: true, allowNull: true },
    fullName: { type: DataTypes.STRING(60) },
    username: { type: DataTypes.STRING(16) },
    phoneNumber: { type: DataTypes.STRING(14) },
    email: { type: DataTypes.STRING(85) },
    userBiography: { type: DataTypes.STRING(200) },
    userPotho: { type: DataTypes.STRING(50) },
    password: { type: DataTypes.STRING(255) },
    userType: { type: DataTypes.ENUM("Admin", "Calificador") },
    token: { type: DataTypes.STRING(45) },
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
