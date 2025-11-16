import { Router } from "express";
import {createAvion,getAviones,getAvion,updateAvion,deleteAvion} from "../controller/avionController.js";
import {CreateAvionSchema,UpdateAvionSchema,IdParamSchema} from "../validators/avionValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const avionRouter = Router();

avionRouter.post("/avion", validateRequest(CreateAvionSchema), createAvion);
avionRouter.get("/avion", getAviones);
avionRouter.get("/avion/:id", validateRequest(IdParamSchema, "params"), getAvion);
avionRouter.put("/avion/:id", validateRequest(UpdateAvionSchema), updateAvion);
avionRouter.delete("/avion/:id", validateRequest(IdParamSchema, "params"), deleteAvion);

export default avionRouter;
