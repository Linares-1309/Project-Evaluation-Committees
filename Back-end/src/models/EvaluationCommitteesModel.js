import db from "../db/db.js";
import { DataTypes } from "sequelize";
import IdeasModel from "./IdeasModel.js";
import UserModel from "./userModel.js";

const EvaluationCommitteesModel = db.define(
  "comités-evaluación",
  {
    id_comites_evaluación: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    fec_comité_evaluación: { type: DataTypes.DATE },
    Obs_Comite: { type: DataTypes.STRING(255) },
    id_idea: {
      type: DataTypes.INTEGER,
      references: {
        model: IdeasModel,
        as: "ideas",
      },
    },
    Id_User: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        as: "user",
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
export default EvaluationCommitteesModel;
