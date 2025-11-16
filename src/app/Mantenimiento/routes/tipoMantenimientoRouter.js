import { Router } from "express";
import * as TipoMantenimientoController from "../controller/TipoMantenimientoController.js";
import {
    CreateTipoMantenimientoSchema,
    UpdateTipoMantenimientoSchema,
    TipoMantenimientoIdParamSchema
} from "../validators/tipoMantenimientoValidator.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const tipoMantenimientoRouter = Router();

// Crear un nuevo tipo de mantenimiento
tipoMantenimientoRouter.post(
    "/tipoMantenimientoRouter",
    validateRequest(CreateTipoMantenimientoSchema),
    TipoMantenimientoController.crearTipoMantenimiento
);

// Obtener todos los tipos de mantenimiento
tipoMantenimientoRouter.get("/tipoMantenimientoRouter", TipoMantenimientoController.obtenerTiposMantenimiento);

// Obtener tipos de mantenimiento activos
tipoMantenimientoRouter.get("/tipoMantenimientoRouter/activos", TipoMantenimientoController.obtenerTiposActivos);

// Estadísticas generales de tipos de mantenimiento
tipoMantenimientoRouter.get("/tipoMantenimientoRouter/estadisticas", TipoMantenimientoController.obtenerEstadisticasTipos);

// Estadísticas detalladas con conteo
tipoMantenimientoRouter.get("/tipoMantenimientoRouter/estadisticas/conteo", TipoMantenimientoController.obtenerTiposConEstadisticas);

// Obtener tipos de mantenimiento filtrados por frecuencia
tipoMantenimientoRouter.get("/tipoMantenimientoRouter/filtro/frecuencia", TipoMantenimientoController.obtenerTiposPorFrecuencia);

// Obtener un tipo de mantenimiento por ID
tipoMantenimientoRouter.get(
    "/tipoMantenimientoRouter/:id",
    validateRequest(TipoMantenimientoIdParamSchema, "params"),
    TipoMantenimientoController.obtenerTipoMantenimiento
);

// Actualizar un tipo de mantenimiento por ID
tipoMantenimientoRouter.put(
    "/tipoMantenimientoRouter/:id",
    validateRequest(TipoMantenimientoIdParamSchema, "params"),
    validateRequest(UpdateTipoMantenimientoSchema),
    TipoMantenimientoController.actualizarTipoMantenimiento
);

// Eliminar un tipo de mantenimiento por ID
tipoMantenimientoRouter.delete(
    "/tipoMantenimientoRouter/:id",
    validateRequest(TipoMantenimientoIdParamSchema, "params"),
    TipoMantenimientoController.eliminarTipoMantenimiento
);

export default tipoMantenimientoRouter;
