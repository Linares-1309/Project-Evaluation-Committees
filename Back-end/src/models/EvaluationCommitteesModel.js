import db from "../db/db.js";
import { DataTypes } from "sequelize";
import SetOfCriteriaModel from "./SetOfCriteriaModel.js";
import IdeasModel from "./IdeasModel.js";
import UserModel from "./userModel.js";

const EvaluationCommitteesModel = db.define(
  "comités-evaluación",
  {
    id_comités_evaluación: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    fec_comité_evaluación: { type: DataTypes.DATE },
    id_idea: {
      type: DataTypes.INTEGER,
      references: {
        model: IdeasModel,
        as: "ideas",
      },
    },
    id_conjunto_criterio: {
      type: DataTypes.INTEGER,
      references: {
        model: SetOfCriteriaModel,
        as: "conjunto-criterio",
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
