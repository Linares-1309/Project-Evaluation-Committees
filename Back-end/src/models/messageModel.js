import db from "../db/db.js";
import { DataTypes } from "sequelize";

const MessageModel = db.define(
  "messages",
  {
    id_message: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    des_message: { type: DataTypes.STRING(255) },
    username: { type: DataTypes.STRING(60) },
    email: { type: DataTypes.STRING(60) },
  },
  {
    timestamps: true,
    createdAt: "create_time",
    updatedAt: false,
    freezeTableName: true,
  }
);
export default MessageModel;
