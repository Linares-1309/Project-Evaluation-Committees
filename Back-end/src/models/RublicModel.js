import db from "../db/db.js";
import { DataTypes } from "sequelize";
import CriteriaModel from "./CriteriaModel.js";

const RubricModel = db.define(
  "rubricas",
  {
    id_rubricas: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    des_rubricas: { type: DataTypes.STRING(255) },
    id_criterio: {
      type: DataTypes.INTEGER,
      references: {
        model: CriteriaModel,
        as: "criteria-for-rubric",
      },
    },
  },
  {
    timestamps: true,
    createdAt: "create_time",
    updatedAt: false,
    freezeTableName: true,
  }
);
export default RubricModel;
