import db from "../db/db.js";
import { DataTypes } from "sequelize";
import SetOfCriteriaModel from "./SetOfCriteriaModel.js";

const CriteriaModel = db.define(
  "criterios",
  {
    id_criterio: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    des_criterio: { type: DataTypes.STRING(45) },
    id_conjunto_criterio: {
      type: DataTypes.INTEGER,
      references: {
        model: SetOfCriteriaModel,
        as: "criterio",
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
export default CriteriaModel;
