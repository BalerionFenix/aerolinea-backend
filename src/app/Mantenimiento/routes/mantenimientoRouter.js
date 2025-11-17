import { Router } from "express";
import * as MantenimientoController from "../controller/MantenimientoController.js";
import {
    CreateMantenimientoSchema,
    UpdateMantenimientoSchema,
    MantenimientoIdParamSchema,
    MantenimientoQuerySchema,
    AeronaveIdParamSchema,
    EstadoMantenimientoParamSchema,
    ProximosMantenimientosQuerySchema
} from "../validators/mantenimientoValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const mantenimientoRouter = Router();

// RUTAS DE MANTENIMIENTOS
mantenimientoRouter.post(
    "/mantenimiento",
    validateRequest(CreateMantenimientoSchema),
    MantenimientoController.crearMantenimiento
);

mantenimientoRouter.get(
    "/mantenimiento",
    validateRequest(MantenimientoQuerySchema, "query"),
    MantenimientoController.obtenerMantenimientos
);

mantenimientoRouter.get(
    "/mantenimiento/estadisticas",
    MantenimientoController.obtenerEstadisticasMantenimiento
);

mantenimientoRouter.get(
    "/mantenimiento/proximos",
    validateRequest(ProximosMantenimientosQuerySchema, "query"),
    MantenimientoController.obtenerProximosMantenimientos
);

mantenimientoRouter.get(
    "/mantenimiento/aeronave/:aeronaveId",
    validateRequest(AeronaveIdParamSchema, "params"),
    MantenimientoController.obtenerMantenimientosPorAeronave
);

mantenimientoRouter.get(
    "/mantenimiento/estado/:estado",
    validateRequest(EstadoMantenimientoParamSchema, "params"),
    MantenimientoController.obtenerMantenimientosPorEstado
);

mantenimientoRouter.get(
    "/mantenimiento/:id",
    validateRequest(MantenimientoIdParamSchema, "params"),
    MantenimientoController.obtenerMantenimiento
);

mantenimientoRouter.put(
    "/mantenimiento/:id",
    validateRequest(MantenimientoIdParamSchema, "params"),
    validateRequest(UpdateMantenimientoSchema),
    MantenimientoController.actualizarMantenimiento
);

mantenimientoRouter.delete(
    "/mantenimiento/:id",
    validateRequest(MantenimientoIdParamSchema, "params"),
    MantenimientoController.eliminarMantenimiento
);

export default mantenimientoRouter;
