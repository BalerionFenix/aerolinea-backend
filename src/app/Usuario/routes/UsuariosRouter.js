import { Router } from "express";
import {
    createUsuario, getUsuarios, getUsuario, updateUsuario, deleteUsuario, getUsuarioByEmail
} from "../controller/UsuarioController.js";
import {
    CreateUsuarioSchema, UpdateUsuarioSchema, IdParamSchema, EmailParamSchema
} from "../validators/UserValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const usuarioRouter = Router();

usuarioRouter.post("/usuario", validateRequest(CreateUsuarioSchema), createUsuario);
usuarioRouter.get("/usuario", getUsuarios);
usuarioRouter.get("/usuario/:id", validateRequest(IdParamSchema, "params"), getUsuario);
usuarioRouter.get("/usuario/email/:email", validateRequest(EmailParamSchema, "params"), getUsuarioByEmail);
usuarioRouter.put("/usuario/:id", validateRequest(UpdateUsuarioSchema), updateUsuario);
usuarioRouter.delete("/usuario/:id", validateRequest(IdParamSchema, "params"), deleteUsuario);

export default usuarioRouter;
