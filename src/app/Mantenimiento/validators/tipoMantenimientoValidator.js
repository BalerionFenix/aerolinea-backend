import Joi from "joi";

export const CreateTipoMantenimientoSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre es requerido",
        "string.min": "El nombre debe tener al menos 2 caracteres",
        "string.max": "El nombre debe tener máximo 100 caracteres",
        "any.required": "El nombre es requerido"
    }),
    descripcion: Joi.string().max(500).allow("").optional().messages({
        "string.base": "La descripción debe ser un texto",
        "string.max": "La descripción debe tener máximo 500 caracteres"
    }),
    duracion_estimada: Joi.number().integer().min(1).max(365).required().messages({
        "number.base": "La duración estimada debe ser un número",
        "number.integer": "La duración estimada debe ser un número entero",
        "number.min": "La duración estimada debe ser al menos 1 día",
        "number.max": "La duración estimada no puede ser mayor a 365 días",
        "any.required": "La duración estimada es requerida"
    }),
    frecuencia: Joi.number().integer().min(1).max(3650).required().messages({
        "number.base": "La frecuencia debe ser un número",
        "number.integer": "La frecuencia debe ser un número entero",
        "number.min": "La frecuencia debe ser al menos 1 día",
        "number.max": "La frecuencia no puede ser mayor a 3650 días (10 años)",
        "any.required": "La frecuencia es requerida"
    }),
    estado: Joi.boolean().default(true).messages({
        "boolean.base": "El estado debe ser un valor booleano"
    })
});

export const UpdateTipoMantenimientoSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).optional().messages({
        "string.base": "El nombre debe ser un texto",
        "string.min": "El nombre debe tener al menos 2 caracteres",
        "string.max": "El nombre debe tener máximo 100 caracteres"
    }),
    descripcion: Joi.string().max(500).allow("").optional().messages({
        "string.base": "La descripción debe ser un texto",
        "string.max": "La descripción debe tener máximo 500 caracteres"
    }),
    duracion_estimada: Joi.number().integer().min(1).max(365).optional().messages({
        "number.base": "La duración estimada debe ser un número",
        "number.integer": "La duración estimada debe ser un número entero",
        "number.min": "La duración estimada debe ser al menos 1 día",
        "number.max": "La duración estimada no puede ser mayor a 365 días"
    }),
    frecuencia: Joi.number().integer().min(1).max(3650).optional().messages({
        "number.base": "La frecuencia debe ser un número",
        "number.integer": "La frecuencia debe ser un número entero",
        "number.min": "La frecuencia debe ser al menos 1 día",
        "number.max": "La frecuencia no puede ser mayor a 3650 días (10 años)"
    }),
    estado: Joi.boolean().optional().messages({
        "boolean.base": "El estado debe ser un valor booleano"
    })
});

export const TipoMantenimientoIdParamSchema = Joi.object({
    id: Joi.number().integer().min(1).required().messages({
        "number.base": "El ID debe ser un número",
        "number.integer": "El ID debe ser un número entero",
        "number.min": "El ID debe ser mayor a 0",
        "any.required": "El ID es requerido"
    })
});

export const TipoMantenimientoQuerySchema = Joi.object({
    min_frecuencia: Joi.number().integer().min(1).max(3650).optional().messages({
        "number.base": "La frecuencia mínima debe ser un número",
        "number.integer": "La frecuencia mínima debe ser un número entero",
        "number.min": "La frecuencia mínima debe ser al menos 1 día",
        "number.max": "La frecuencia mínima no puede ser mayor a 3650 días"
    }),
    max_frecuencia: Joi.number().integer().min(1).max(3650).optional().messages({
        "number.base": "La frecuencia máxima debe ser un número",
        "number.integer": "La frecuencia máxima debe ser un número entero",
        "number.min": "La frecuencia máxima debe ser al menos 1 día",
        "number.max": "La frecuencia máxima no puede ser mayor a 3650 días"
    })
});
