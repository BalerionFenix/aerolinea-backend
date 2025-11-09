import { Router } from "express";
import { createBase, getBases, getBase, updateBase, deleteBase } from "../controller/baseController.js";
import { CreateBaseSchema, UpdateBaseSchema, IdParamSchema } from "../validators/baseValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const baseRouter = Router();

baseRouter.post("/base", validateRequest(CreateBaseSchema), createBase);
baseRouter.get("/base", getBases);
baseRouter.get("/base/:id", validateRequest(IdParamSchema, "params"), getBase);
baseRouter.put("/base/:id", validateRequest(UpdateBaseSchema), updateBase);
baseRouter.delete("/base/:id", validateRequest(IdParamSchema, "params"), deleteBase);

export default baseRouter;