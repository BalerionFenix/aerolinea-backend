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
    "/tipo-mantenimiento",
    validateRequest(CreateTipoMantenimientoSchema),
    TipoMantenimientoController.crearTipoMantenimiento
);

// Obtener todos los tipos de mantenimiento
tipoMantenimientoRouter.get(
    "/tipo-mantenimiento",
    TipoMantenimientoController.obtenerTiposMantenimiento
);

// Obtener tipos de mantenimiento activos
tipoMantenimientoRouter.get(
    "/tipo-mantenimiento/activos",
    TipoMantenimientoController.obtenerTiposActivos
);

// Estadísticas generales de tipos de mantenimiento
tipoMantenimientoRouter.get(
    "/tipo-mantenimiento/estadisticas",
    TipoMantenimientoController.obtenerEstadisticasTipos
);

// Estadísticas detalladas con conteo
tipoMantenimientoRouter.get(
    "/tipo-mantenimiento/estadisticas/conteo",
    TipoMantenimientoController.obtenerTiposConEstadisticas
);

// Obtener tipos de mantenimiento filtrados por frecuencia
tipoMantenimientoRouter.get(
    "/tipo-mantenimiento/filtro/frecuencia",
    TipoMantenimientoController.obtenerTiposPorFrecuencia
);

// Obtener un tipo de mantenimiento por ID
tipoMantenimientoRouter.get(
    "/tipo-mantenimiento/:id",
    validateRequest(TipoMantenimientoIdParamSchema, "params"),
    TipoMantenimientoController.obtenerTipoMantenimiento
);

// Actualizar un tipo de mantenimiento por ID
tipoMantenimientoRouter.put(
    "/tipo-mantenimiento/:id",
    validateRequest(TipoMantenimientoIdParamSchema, "params"),
    validateRequest(UpdateTipoMantenimientoSchema),
    TipoMantenimientoController.actualizarTipoMantenimiento
);

// Eliminar un tipo de mantenimiento por ID
tipoMantenimientoRouter.delete(
    "/tipo-mantenimiento/:id",
    validateRequest(TipoMantenimientoIdParamSchema, "params"),
    TipoMantenimientoController.eliminarTipoMantenimiento
);

export default tipoMantenimientoRouter;