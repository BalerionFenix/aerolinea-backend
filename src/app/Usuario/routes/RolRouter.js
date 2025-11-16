import { Router } from "express";
import {
    createRol, getRoles, getRol, updateRol, deleteRol
} from "../controller/RolController.js";
import {
    CreateRolSchema, UpdateRolSchema, IdParamSchema
} from "../validators/RolValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const rolRouter = Router();

rolRouter.post("/rol", validateRequest(CreateRolSchema), createRol);
rolRouter.get("/rol", getRoles);
rolRouter.get("/rol/:id", validateRequest(IdParamSchema, "params"), getRol);
rolRouter.put("/rol/:id", validateRequest(UpdateRolSchema), updateRol);
rolRouter.delete("/rol/:id", validateRequest(IdParamSchema, "params"), deleteRol);

export default rolRouter;
