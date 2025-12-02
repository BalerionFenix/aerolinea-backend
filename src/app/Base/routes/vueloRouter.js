import { Router } from "express";
import {createVuelo, getVuelos, getVuelo, updateVuelo,deleteVuelo} from "../controller/vueloController.js";
import {CreateVueloSchema, UpdateVueloSchema, IdParamSchema} from "../validators/vueloValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const vueloRouter = Router();

vueloRouter.post("/vuelo", validateRequest(CreateVueloSchema), createVuelo);
vueloRouter.get("/vuelo", getVuelos);
vueloRouter.get("/vuelo/:id", validateRequest(IdParamSchema, "params"), getVuelo);
vueloRouter.put("/vuelo/:id", validateRequest(UpdateVueloSchema), updateVuelo);
vueloRouter.delete("/vuelo/:id", validateRequest(IdParamSchema, "params"), deleteVuelo);

export default vueloRouter;
