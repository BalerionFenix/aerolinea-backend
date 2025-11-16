import express from "express";
import baseRouter from "./app/Base/routes/baseRouter.js";

import mantenimientoRouter from "./app/Mantenimiento/routes/mantenimientoRouter.js";
import tipoMantenimientoRouter from "./app/Mantenimiento/routes/tipoMantenimientoRouter.js";
import usuarioRouter from "./app/Usuario/routes/UsuariosRouter.js";
import rolRouter from "./app/Usuario/routes/RolRouter.js";
import cors from "cors";


const app = express();
app.use(express.json(), cors());
app.use('/api', [baseRouter, mantenimientoRouter, tipoMantenimientoRouter, usuarioRouter, rolRouter]);


export default app;

