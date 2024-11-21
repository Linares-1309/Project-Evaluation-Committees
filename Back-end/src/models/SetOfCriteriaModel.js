import db from "../db/db.js";
import { DataTypes } from "sequelize";

const SetOfCriteriaModel = db.define(
  "conjunto_criterios",
  {
    id_conjunto_criterio: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    des_conjunto_criterio: { type: DataTypes.STRING(80) },
  },
  {
    timestamps: true,
    createdAt: "create_time",
    updatedAt: false,
    freezeTableName: true,
  }
);
export default SetOfCriteriaModel;

