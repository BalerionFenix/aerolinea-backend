import Joi from "joi";

export const CreateMantenimientoSchema = Joi.object({
    tipo_mantenimiento_id: Joi.number().integer().min(1).required().messages({
        "number.base": "El ID del tipo de mantenimiento debe ser un número",
        "number.integer": "El ID del tipo de mantenimiento debe ser un número entero",
        "number.min": "El ID del tipo de mantenimiento debe ser mayor a 0",
        "any.required": "El tipo de mantenimiento es requerido"
    }),
    aeronave_id: Joi.number().integer().min(1).required().messages({
        "number.base": "El ID de la aeronave debe ser un número",
        "number.integer": "El ID de la aeronave debe ser un número entero",
        "number.min": "El ID de la aeronave debe ser mayor a 0",
        "any.required": "La aeronave es requerida"
    }),
    fecha_programada: Joi.date().iso().greater('now').required().messages({
        "date.base": "La fecha programada debe ser una fecha válida",
        "date.format": "La fecha programada debe estar en formato ISO",
        "date.greater": "La fecha programada debe ser una fecha futura",
        "any.required": "La fecha programada es requerida"
    }),
    fecha_inicio: Joi.date().iso().optional().allow(null).messages({
        "date.base": "La fecha de inicio debe ser una fecha válida",
        "date.format": "La fecha de inicio debe estar en formato ISO"
    }),
    fecha_fin: Joi.date().iso().greater(Joi.ref('fecha_inicio')).optional().allow(null).messages({
        "date.base": "La fecha de fin debe ser una fecha válida",
        "date.format": "La fecha de fin debe estar en formato ISO",
        "date.greater": "La fecha de fin debe ser posterior a la fecha de inicio"
    }),
    costo_estimado: Joi.number().precision(2).min(0).required().messages({
        "number.base": "El costo estimado debe ser un número",
        "number.precision": "El costo estimado debe tener máximo 2 decimales",
        "number.min": "El costo estimado debe ser mayor o igual a 0",
        "any.required": "El costo estimado es requerido"
    }),
    costo_real: Joi.number().precision(2).min(0).optional().allow(null).messages({
        "number.base": "El costo real debe ser un número",
        "number.precision": "El costo real debe tener máximo 2 decimales",
        "number.min": "El costo real debe ser mayor o igual a 0"
    }),
    descripcion: Joi.string().max(1000).allow("").optional().messages({
        "string.base": "La descripción debe ser un texto",
        "string.max": "La descripción debe tener máximo 1000 caracteres"
    }),
    estado: Joi.string().valid("programado", "en_proceso", "completado", "cancelado").default("programado").messages({
        "string.base": "El estado debe ser un texto",
        "any.only": "El estado solo puede ser: programado, en_proceso, completado o cancelado"
    }),
    personal_asignado: Joi.string().max(255).allow("").optional().messages({
        "string.base": "El personal asignado debe ser un texto",
        "string.max": "El personal asignado debe tener máximo 255 caracteres"
    })
});

export const UpdateMantenimientoSchema = Joi.object({
    tipo_mantenimiento_id: Joi.number().integer().min(1).optional().messages({
        "number.base": "El ID del tipo de mantenimiento debe ser un número",
        "number.integer": "El ID del tipo de mantenimiento debe ser un número entero",
        "number.min": "El ID del tipo de mantenimiento debe ser mayor a 0"
    }),
    aeronave_id: Joi.number().integer().min(1).optional().messages({
        "number.base": "El ID de la aeronave debe ser un número",
        "number.integer": "El ID de la aeronave debe ser un número entero",
        "number.min": "El ID de la aeronave debe ser mayor a 0"
    }),
    fecha_programada: Joi.date().iso().optional().messages({
        "date.base": "La fecha programada debe ser una fecha válida",
        "date.format": "La fecha programada debe estar en formato ISO"
    }),
    fecha_inicio: Joi.date().iso().optional().allow(null).messages({
        "date.base": "La fecha de inicio debe ser una fecha válida",
        "date.format": "La fecha de inicio debe estar en formato ISO"
    }),
    fecha_fin: Joi.date().iso().greater(Joi.ref('fecha_inicio')).optional().allow(null).messages({
        "date.base": "La fecha de fin debe ser una fecha válida",
        "date.format": "La fecha de fin debe estar en formato ISO",
        "date.greater": "La fecha de fin debe ser posterior a la fecha de inicio"
    }),
    costo_estimado: Joi.number().precision(2).min(0).optional().messages({
        "number.base": "El costo estimado debe ser un número",
        "number.precision": "El costo estimado debe tener máximo 2 decimales",
        "number.min": "El costo estimado debe ser mayor o igual a 0"
    }),
    costo_real: Joi.number().precision(2).min(0).optional().allow(null).messages({
        "number.base": "El costo real debe ser un número",
        "number.precision": "El costo real debe tener máximo 2 decimales",
        "number.min": "El costo real debe ser mayor o igual a 0"
    }),
    descripcion: Joi.string().max(1000).allow("").optional().messages({
        "string.base": "La descripción debe ser un texto",
        "string.max": "La descripción debe tener máximo 1000 caracteres"
    }),
    estado: Joi.string().valid("programado", "en_proceso", "completado", "cancelado").optional().messages({
        "string.base": "El estado debe ser un texto",
        "any.only": "El estado solo puede ser: programado, en_proceso, completado o cancelado"
    }),
    personal_asignado: Joi.string().max(255).allow("").optional().messages({
        "string.base": "El personal asignado debe ser un texto",
        "string.max": "El personal asignado debe tener máximo 255 caracteres"
    })
});

export const MantenimientoIdParamSchema = Joi.object({
    id: Joi.number().integer().min(1).required().messages({
        "number.base": "El ID debe ser un número",
        "number.integer": "El ID debe ser un número entero",
        "number.min": "El ID debe ser mayor a 0",
        "any.required": "El ID es requerido"
    })
});

export const MantenimientoQuerySchema = Joi.object({
    pagina: Joi.number().integer().min(1).default(1).messages({
        "number.base": "La página debe ser un número",
        "number.integer": "La página debe ser un número entero",
        "number.min": "La página debe ser mayor a 0"
    }),
    limite: Joi.number().integer().min(1).max(100).default(10).messages({
        "number.base": "El límite debe ser un número",
        "number.integer": "El límite debe ser un número entero",
        "number.min": "El límite debe ser mayor a 0",
        "number.max": "El límite no puede ser mayor a 100"
    }),
    estado: Joi.string().valid("programado", "en_proceso", "completado", "cancelado").optional().messages({
        "string.base": "El estado debe ser un texto",
        "any.only": "El estado solo puede ser: programado, en_proceso, completado o cancelado"
    }),
    aeronave_id: Joi.number().integer().min(1).optional().messages({
        "number.base": "El ID de la aeronave debe ser un número",
        "number.integer": "El ID de la aeronave debe ser un número entero",
        "number.min": "El ID de la aeronave debe ser mayor a 0"
    })
});

export const AeronaveIdParamSchema = Joi.object({
    aeronaveId: Joi.number().integer().min(1).required().messages({
        "number.base": "El ID de la aeronave debe ser un número",
        "number.integer": "El ID de la aeronave debe ser un número entero",
        "number.min": "El ID de la aeronave debe ser mayor a 0",
        "any.required": "El ID de la aeronave es requerido"
    })
});

export const EstadoMantenimientoParamSchema = Joi.object({
    estado: Joi.string().valid("programado", "en_proceso", "completado", "cancelado").required().messages({
        "string.base": "El estado debe ser un texto",
        "any.only": "El estado solo puede ser: programado, en_proceso, completado o cancelado",
        "any.required": "El estado es requerido"
    })
});

export const ProximosMantenimientosQuerySchema = Joi.object({
    limite: Joi.number().integer().min(1).max(50).default(5).messages({
        "number.base": "El límite debe ser un número",
        "number.integer": "El límite debe ser un número entero",
        "number.min": "El límite debe ser mayor a 0",
        "number.max": "El límite no puede ser mayor a 50"
    })
});