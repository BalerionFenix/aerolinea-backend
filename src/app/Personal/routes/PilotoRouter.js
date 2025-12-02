import { Router } from "express";
import {
    createPiloto, getPilotos, getPiloto, updatePiloto, deletePiloto
} from "../controller/PilotoController.js";
import { CreatePilotoSchema, UpdatePilotoSchema, CodigoParamSchema } from "../validators/PilotoValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

router.post("/piloto", validateRequest(CreatePilotoSchema), createPiloto);
router.get("/piloto", getPilotos);
router.get("/piloto/:codigo", validateRequest(CodigoParamSchema, "params"), getPiloto);
router.put("/piloto/:codigo", validateRequest(UpdatePilotoSchema), updatePiloto);
router.delete("/piloto/:codigo", validateRequest(CodigoParamSchema, "params"), deletePiloto);

export default router;
