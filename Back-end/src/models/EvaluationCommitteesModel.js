import db from "../db/db.js";
import { DataTypes } from "sequelize";
import IdeasModel from "./IdeasModel.js";
import UserModel from "./userModel.js";

const EvaluationCommitteesModel = db.define(
  "comites-evaluacion",
  {
    id_comites_evaluacion: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      autoIncrement: true,
    },
    fec_comite_evaluacion: { type: DataTypes.DATE },
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


// NECESITO GENERAR UN CODIGO DE 15 CARACTERES SEPARADO CADA 5 POR UN (-) DEBE TENER LETRAR Y NUMEROS EJEMPLO: J56GH-5FTJ6-FT3H9 DEBE SER ALEATORIO CADA VEZ QUESE EJECUTE DEBE SALIR UNO DIFERENTE