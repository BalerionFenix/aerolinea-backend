import Joi from "joi";

// Validator para crear rol
export const CreateRolSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
        "string.base": "El nombre del rol debe ser un texto",
        "string.empty": "El nombre del rol es requerido",
        "string.min": "El nombre del rol debe tener al menos 2 caracteres",
        "string.max": "El nombre del rol debe tener máximo 100 caracteres",
        "any.required": "El nombre del rol es requerido"
    }),
    descripcion: Joi.string().max(255).allow("").optional().messages({
        "string.base": "La descripción debe ser un texto",
        "string.max": "La descripción debe tener máximo 255 caracteres"
    }),
    activo: Joi.boolean().optional().default(true)
});

// Validator para actualizar rol
export const UpdateRolSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).optional().messages({
        "string.base": "El nombre del rol debe ser un texto",
        "string.min": "El nombre del rol debe tener al menos 2 caracteres",
        "string.max": "El nombre del rol debe tener máximo 100 caracteres"
    }),
    descripcion: Joi.string().max(255).allow("").optional().messages({
        "string.base": "La descripción debe ser un texto",
        "string.max": "La descripción debe tener máximo 255 caracteres"
    }),
    activo: Joi.boolean().optional()
});

// Validator para ID en parámetros
export const IdParamSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        "number.base": "El ID debe ser un número",
        "number.integer": "El ID debe ser un número entero",
        "any.required": "El ID es requerido"
    })
});
