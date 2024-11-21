import db from "../db/db.js";
import { DataTypes } from "sequelize";
import ProponentModel from "./ProponentModel.js";

const IdeasModel = db.define(
  "ideas",
  {
    id_idea: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom_idea: { type: DataTypes.STRING(150) },
    estado_idea: {
      type: DataTypes.ENUM("Convocado", "No convocado"),
    },
    des_idea: { type: DataTypes.STRING(115) },
    cal_final: { type: DataTypes.DECIMAL(10, 2) },
    id_proponente: {
      type: DataTypes.INTEGER,
      references: {
        model: ProponentModel,
        as: "proponente",
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
export default IdeasModel;
