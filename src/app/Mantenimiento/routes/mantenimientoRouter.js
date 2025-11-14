import { Router } from "express";

import {
    crearMantenimiento,
    obtenerMantenimientos,
    obtenerEstadisticasMantenimiento,
    obtenerProximosMantenimientos,
    obtenerMantenimientosPorAeronave,
    obtenerMantenimientosPorEstado,
    obtenerMantenimiento,
    actualizarMantenimiento,
    eliminarMantenimiento
} from "../controllers/MantenimientoController.js";

import {
    crearTipoMantenimiento,
    obtenerTiposMantenimiento,
    obtenerTiposActivos,
    obtenerEstadisticasTipos,
    obtenerTipoMantenimiento,
    actualizarTipoMantenimiento,
    eliminarTipoMantenimiento
} from "../controllers/TipoMantenimientoController.js";

import {
    CrearMantenimientoSchema,
    ActualizarMantenimientoSchema,
    CrearTipoMantenimientoSchema,
    ActualizarTipoMantenimientoSchema,
    IdParamSchema,
    PaginacionSchema
} from "../validators/mantenimientoValidator.js";

import { validateRequest } from "../middlewares/validateRequest.js";


const mantenimientoRouter = Router();

// =============================================
// RUTAS PARA MANTENIMIENTOS
// =============================================

mantenimientoRouter.post(
    "/mantenimientos",
    validateRequest(CrearMantenimientoSchema),
    crearMantenimiento
);

mantenimientoRouter.get(
    "/mantenimientos",
    validateRequest(PaginacionSchema, "query"),
    obtenerMantenimientos
);

mantenimientoRouter.get(
    "/mantenimientos/estadisticas",
    obtenerEstadisticasMantenimiento
);

mantenimientoRouter.get(
    "/mantenimientos/proximos",
    obtenerProximosMantenimientos
);

mantenimientoRouter.get(
    "/mantenimientos/aeronave/:aeronaveId",
    validateRequest(IdParamSchema, "params"),
    obtenerMantenimientosPorAeronave
);

mantenimientoRouter.get(
    "/mantenimientos/estado/:estado",
    obtenerMantenimientosPorEstado
);

mantenimientoRouter.get(
    "/mantenimientos/:id",
    validateRequest(IdParamSchema, "params"),
    obtenerMantenimiento
);

mantenimientoRouter.put(
    "/mantenimientos/:id",
    validateRequest(IdParamSchema, "params"),
    validateRequest(ActualizarMantenimientoSchema),
    actualizarMantenimiento
);

mantenimientoRouter.delete(
    "/mantenimientos/:id",
    validateRequest(IdParamSchema, "params"),
    eliminarMantenimiento
);


// =============================================
// RUTAS PARA TIPOS DE MANTENIMIENTO
// =============================================

mantenimientoRouter.post(
    "/tipos-mantenimiento",
    validateRequest(CrearTipoMantenimientoSchema),
    crearTipoMantenimiento
);

mantenimientoRouter.get(
    "/tipos-mantenimiento",
    obtenerTiposMantenimiento
);

mantenimientoRouter.get(
    "/tipos-mantenimiento/activos",
    obtenerTiposActivos
);

mantenimientoRouter.get(
    "/tipos-mantenimiento/estadisticas",
    obtenerEstadisticasTipos
);

mantenimientoRouter.get(
    "/tipos-mantenimiento/:id",
    validateRequest(IdParamSchema, "params"),
    obtenerTipoMantenimiento
);

mantenimientoRouter.put(
    "/tipos-mantenimiento/:id",
    validateRequest(IdParamSchema, "params"),
    validateRequest(ActualizarTipoMantenimientoSchema),
    actualizarTipoMantenimiento
);
router.get('/tipos-mantenimiento/estadisticas/conteo',
    TipoMantenimientoController.obtenerTiposConEstadisticas
);

router.get('/tipos-mantenimiento/filtro/frecuencia',
    TipoMantenimientoController.obtenerTiposPorFrecuencia
);

mantenimientoRouter.delete(
    "/tipos-mantenimiento/:id",
    validateRequest(IdParamSchema, "params"),
    eliminarTipoMantenimiento
);

export default mantenimientoRouter;
