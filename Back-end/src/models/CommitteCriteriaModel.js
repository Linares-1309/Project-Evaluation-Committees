import db from "../db/db.js";
import { DataTypes } from "sequelize";
import EvaluationCommitteesModel from "./EvaluationCommitteesModel.js";
import CriteriaModel from "./CriteriaModel.js";

const CommitteesCriteriaModel = db.define(
  "comité-criterios",
  {
    id_comité_criterios: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_comites_evaluación: {
      type: DataTypes.INTEGER,
      references: {
        model: EvaluationCommitteesModel,
        as: "comite-criterios",
      },
    },
    id_criterio: {
      type: DataTypes.INTEGER,
      references: {
        model: CriteriaModel,
        as: "criteria-committees",
      },
    },
    cal_comité_criterios: {
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
