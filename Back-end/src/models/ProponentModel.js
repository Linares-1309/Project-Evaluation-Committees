import db from "../db/db.js";
import { DataTypes } from "sequelize";

const ProponentModel = db.define(
  "proponentes",
  {
    id_proponente: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    nombres_proponente: {
      type: DataTypes.STRING(30),
    },
    apellidos_proponente: {
      type: DataTypes.STRING(45),
    },
    correo_proponente: {
      type: DataTypes.STRING(45),
    },
    telefono_proponente: {
      type: DataTypes.STRING(45),
    },
  },
  {
    timestamps: true,
    createdAt: "create_time",
    updatedAt: false,
    freezeTableName: true,
  }
);
export default ProponentModel;
