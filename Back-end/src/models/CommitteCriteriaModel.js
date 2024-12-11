import db from "../db/db.js";
import { DataTypes } from "sequelize";
import EvaluationCommitteesModel from "./EvaluationCommitteesModel.js";
import CriteriaModel from "./CriteriaModel.js";

const CommitteesCriteriaModel = db.define(
  "comite-criterios",
  {
    id_comite_criterios: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_comites_evaluacion: {
      type: DataTypes.STRING(20),
      references: {
        model: EvaluationCommitteesModel,
        as: "comite_criterios",
      },
    },
    id_criterio: {
      type: DataTypes.INTEGER,
      references: {
        model: CriteriaModel,
        as: "criteria_committees",
      },
    },
    cal_comite_criterios: {
      type: DataTypes.STRING(5),
    },
  },
  {
    timestamps: true,
    createdAt: "create-time",
    updatedAt: false,
    freezeTableName: true,
  }
);
export default CommitteesCriteriaModel;
