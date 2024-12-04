import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// Base de datos para verificar la conexion
import db from "./db/db.js";

// Logger para el manejo de errores
import { logger } from "./middleware/logMiddleware.js";

//Rutas de los controladores
import UserRouter from "./routes/userRoutes.js";
import SetOfCriteriaRoutes from "./routes/SetOfCriteriaRoutes.js";
import CriteriaRoutes from "./routes/CriteriaRoutes.js";
import ProponentRoutes from "./routes/ProponentRoutes.js";
import IdeasRoutes from "./routes/IdeasRoutes.js";
import EvaluationCommitteesRoutes from "./routes/EvaluationCommitteesRoutes.js";
import RubricsRoutes from "./routes/RubricRoutes.js"

// Se importan los modelos para realizar las relaciones entre tablas
import UserModel from "./models/userModel.js";
import SetOfCriteriaModel from "./models/SetOfCriteriaModel.js";
import CriteriaModel from "./models/CriteriaModel.js";
import ProponentModel from "./models/ProponentModel.js";
import IdeasModel from "./models/IdeasModel.js";
import EvaluationCommitteesModel from "./models/EvaluationCommitteesModel.js";
import RubricModel from "./models/RublicModel.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/api/user", UserRouter);
app.use("/api/set-of-criteria", SetOfCriteriaRoutes);
app.use("/api/criteria", CriteriaRoutes);
app.use("/api/proponent", ProponentRoutes);
app.use("/api/ideas", IdeasRoutes);
app.use("/api/evaluation-committees", EvaluationCommitteesRoutes);
app.use("/api/rubrics", RubricsRoutes);

app.use(express.static(path.join(import.meta.url, "public")));

app.use("/public/uploads/", express.static("public/uploads"));
app.use("/assets", express.static("public/assets"));

try {
  await db.authenticate().then(() => {
    console.log("Conexion a la db exitosa");
  });
} catch (error) {
  console.log(`Error de conexion a la bd ${error}`);
  logger.error(`Error de conexion a la bd  ${error}`);
}

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});

// RELACIONES ESTRE TABLAS

// RELACION ENTRE USUARIOS Y COMITES DE EVALUACION
UserModel.hasMany(EvaluationCommitteesModel, {
  foreignKey: "Id_User",
  as: "user",
});
EvaluationCommitteesModel.belongsTo(UserModel, {
  foreignKey: "Id_User",
  as: "user",
});

// RELACION ENTRE CONJUNTO DE CRITERIOS Y COMITE DE EVALUACION
SetOfCriteriaModel.hasMany(EvaluationCommitteesModel, {
  foreignKey: "id_conjunto_criterio",
  as: "conjunto-criterio",
});
EvaluationCommitteesModel.belongsTo(SetOfCriteriaModel, {
  foreignKey: "id_conjunto_criterio",
  as: "conjunto-criterio",
});

// RELACION ENTRE IDEAS Y COMITES DE EVALUACION
IdeasModel.hasMany(EvaluationCommitteesModel, {
  foreignKey: "id_idea",
  as: "ideas",
});
EvaluationCommitteesModel.belongsTo(IdeasModel, {
  foreignKey: "id_idea",
  as: "ideas",
});

// RELACION ENTRE CRITERIOS Y CONJUNTO DE CRITERIOS
SetOfCriteriaModel.hasMany(CriteriaModel, {
  foreignKey: "id_conjunto_criterio",
  as: "criterio",
});
CriteriaModel.belongsTo(SetOfCriteriaModel, {
  foreignKey: "id_conjunto_criterio",
  as: "criterio",
});
// RELACION ENTRE CRITERIOS Y RUBRICAS
CriteriaModel.hasMany(RubricModel, {
  foreignKey: "id_criterio",
  as: "criteria-for-rubric",
});
RubricModel.belongsTo(CriteriaModel, {
  foreignKey: "id_criterio",
  as: "criteria-for-rubric",
});

// RELACION ENTRE IDEAS Y PROPONENTES
ProponentModel.hasMany(IdeasModel, {
  foreignKey: "id_proponente",
  as: "proponente",
});
IdeasModel.belongsTo(ProponentModel, {
  foreignKey: "id_proponente",
  as: "proponente",
});

// export {  UserModel };
