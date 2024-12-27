import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { fileURLToPath } from "url";

// Variables necesarias para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Base de datos para verificar la conexión
import db from "./db/db.js";

// Logger para el manejo de errores
import { logger } from "./middleware/logMiddleware.js";

// Rutas de los controladores
import UserRouter from "./routes/userRoutes.js";
import SetOfCriteriaRoutes from "./routes/SetOfCriteriaRoutes.js";
import CriteriaRoutes from "./routes/CriteriaRoutes.js";
import ProponentRoutes from "./routes/ProponentRoutes.js";
import IdeasRoutes from "./routes/IdeasRoutes.js";
import EvaluationCommitteesRoutes from "./routes/EvaluationCommitteesRoutes.js";
import RubricsRoutes from "./routes/RubricRoutes.js";
import routerC from "./routes/CommitteCriteriaRoutes.js";
import MessageRoutes from "./routes/messageRoutes.js";

// Modelos para las relaciones
import UserModel from "./models/userModel.js";
import SetOfCriteriaModel from "./models/SetOfCriteriaModel.js";
import CriteriaModel from "./models/CriteriaModel.js";
import ProponentModel from "./models/ProponentModel.js";
import IdeasModel from "./models/IdeasModel.js";
import EvaluationCommitteesModel from "./models/EvaluationCommitteesModel.js";
import RubricModel from "./models/RublicModel.js";
import CommitteesCriteriaModel from "./models/CommitteCriteriaModel.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Crear el servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Permitir conexiones desde cualquier origen
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Configura los eventos de Socket.IO
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Escucha el evento 'send-token'
  socket.on("send-token", (token) => {
    console.log("Token recibido:", token);
    // Aquí puedes procesar el token, por ejemplo, verificarlo o almacenarlo
  });

  // Detecta cuando un cliente se desconecta
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Rutas de la API
app.use("/api/user", UserRouter);
app.use("/api/set-of-criteria", SetOfCriteriaRoutes);
app.use("/api/criteria", CriteriaRoutes);
app.use("/api/proponent", ProponentRoutes);
app.use("/api/ideas", IdeasRoutes);
app.use("/api/evaluation-committees", EvaluationCommitteesRoutes);
app.use("/api/rubrics", RubricsRoutes);
app.use("/api/committe-criterias", routerC);
app.use("/api/message", MessageRoutes);

// Navegar hacia arriba desde src para encontrar public
const publicDir = path.resolve(__dirname, "../public");

// Servir la carpeta "public"
app.use(express.static(publicDir));

// Ruta específica para "uploads"
app.use("/public/uploads", express.static(path.join(publicDir, "uploads")));

// Ruta específica para "assets"
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Conexión a la base de datos
try {
  await db.authenticate();
  console.log("Conexión a la base de datos exitosa");
} catch (error) {
  console.error(`Error de conexión a la base de datos: ${error}`);
  logger.error(`Error de conexión a la base de datos: ${error}`);
}

// Relación entre tablas (Sequelize)
UserModel.hasMany(EvaluationCommitteesModel, {
  foreignKey: "Id_User",
  as: "user",
});
EvaluationCommitteesModel.belongsTo(UserModel, {
  foreignKey: "Id_User",
  as: "user",
});

CommitteesCriteriaModel.belongsTo(EvaluationCommitteesModel, {
  foreignKey: "id_comites_evaluacion",
  as: "comite_criterios",
});
EvaluationCommitteesModel.hasMany(CommitteesCriteriaModel, {
  foreignKey: "id_comites_evaluacion",
  as: "comite_criterios",
});

CommitteesCriteriaModel.belongsTo(CriteriaModel, {
  foreignKey: "id_criterio",
  as: "criteria_committees",
});
CriteriaModel.hasMany(CommitteesCriteriaModel, {
  foreignKey: "id_criterio",
  as: "criteria_committees",
});

IdeasModel.hasMany(EvaluationCommitteesModel, {
  foreignKey: "id_idea",
  as: "ideas",
});
EvaluationCommitteesModel.belongsTo(IdeasModel, {
  foreignKey: "id_idea",
  as: "ideas",
});

SetOfCriteriaModel.hasMany(CriteriaModel, {
  foreignKey: "id_conjunto_criterio",
  as: "criterio",
});
CriteriaModel.belongsTo(SetOfCriteriaModel, {
  foreignKey: "id_conjunto_criterio",
  as: "criterio",
});

CriteriaModel.hasMany(RubricModel, {
  foreignKey: "id_criterio",
  as: "criteria_for_rubric",
});
RubricModel.belongsTo(CriteriaModel, {
  foreignKey: "id_criterio",
  as: "criteria_for_rubric",
});

ProponentModel.hasMany(IdeasModel, {
  foreignKey: "id_proponente",
  as: "proponente",
});
IdeasModel.belongsTo(ProponentModel, {
  foreignKey: "id_proponente",
  as: "proponente",
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
