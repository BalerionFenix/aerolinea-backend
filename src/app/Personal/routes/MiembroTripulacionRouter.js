import { Router } from "express";
import {
    createMiembro, getMiembros, getMiembro, updateMiembro, deleteMiembro
} from "../controller/MiembroTripulacionController.js";
import { CreateMiembroSchema, UpdateMiembroSchema, CodigoParamSchema } from "../validators/MiembroTripulacionValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

router.post("/miembro", validateRequest(CreateMiembroSchema), createMiembro);
router.get("/miembro", getMiembros);
router.get("/miembro/:codigo", validateRequest(CodigoParamSchema, "params"), getMiembro);
router.put("/miembro/:codigo", validateRequest(UpdateMiembroSchema), updateMiembro);
router.delete("/miembro/:codigo", validateRequest(CodigoParamSchema, "params"), deleteMiembro);

export default router;