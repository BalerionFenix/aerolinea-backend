import { Router } from "express";
import {
    createPersona, getPersonas, getPersona, updatePersona, deletePersona
} from "../controller/PersonaController.js";
import { CreatePersonaSchema, UpdatePersonaSchema, CodigoParamSchema } from "../validators/PersonaValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

router.post("/persona", validateRequest(CreatePersonaSchema), createPersona);
router.get("/persona", getPersonas);
router.get("/persona/:codigo", validateRequest(CodigoParamSchema, "params"), getPersona);
router.put("/persona/:codigo", validateRequest(UpdatePersonaSchema), updatePersona);
router.delete("/persona/:codigo", validateRequest(CodigoParamSchema, "params"), deletePersona);

export default router;
