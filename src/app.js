import express from "express";
import baseRouter from "./app/Base/routes/baseRouter.js";
import avionRouter from "./app/Base/routes/avionRouter.js";
import mantenimientoRouter from "./app/Mantenimiento/routes/mantenimientoRouter.js";
import tipoMantenimientoRouter from "./app/Mantenimiento/routes/tipoMantenimientoRouter.js";
import usuarioRouter from "./app/Usuario/routes/UsuariosRouter.js";
import rolRouter from "./app/Usuario/routes/RolRouter.js";
import personaRouter from "./app/Personal/routes/PersonaRouter.js";
import pilotoRouter from "./app/Personal/routes/PilotoRouter.js";
import miembroRouter from "./app/Personal/routes/MiembroTripulacionRouter.js";
import authRouter from "./firebase_auth/auth.js";
import VueloRouter from "./app/Base/routes/vueloRouter.js";
import cors from "cors";


const app = express();
app.use(express.json(), cors());

app.use('/api', [baseRouter, mantenimientoRouter, tipoMantenimientoRouter, usuarioRouter, rolRouter, avionRouter, personaRouter, pilotoRouter, miembroRouter, authRouter, VueloRouter]);


export default app;

