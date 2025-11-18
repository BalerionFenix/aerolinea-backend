import Joi from "joi";

export const CreateBaseSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre es requerido",
        "string.min": "El nombre debe tener al menos 2 caracteres",
        "string.max": "El nombre debe tener máximo 100 caracteres",
        "any.required": "El nombre es requerido"
    }),
    ciudad: Joi.string().min(2).max(100).required().messages({
        "string.base": "La ciudad debe ser un texto",
        "string.empty": "La ciudad es requerida",
        "string.min": "La ciudad debe tener al menos 2 caracteres",
        "string.max": "La ciudad debe tener máximo 100 caracteres",
        "any.required": "La ciudad es requerida"
    }),
    pais: Joi.string().min(2).max(100).required().messages({
        "string.base": "El país debe ser un texto",
        "string.empty": "El país es requerido",
        "string.min": "El país debe tener al menos 2 caracteres",
        "string.max": "El país debe tener máximo 100 caracteres",
        "any.required": "El país es requerido"
    }),
    direccion: Joi.string().max(255).allow("").optional().messages({
        "string.base": "La dirección debe ser un texto",
        "string.max": "La dirección debe tener máximo 255 caracteres"
    }),
    estado: Joi.string().valid("Activo", "Inactivo").default("Activo").messages({
        "string.base": "El estado debe ser un texto",
        "any.only": "El estado solo puede ser 'Activo' o 'Inactivo'"
    })
});

export const UpdateBaseSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).optional().messages({
        "string.base": "El nombre debe ser un texto",
        "string.min": "El nombre debe tener al menos 2 caracteres",
        "string.max": "El nombre debe tener máximo 100 caracteres"
    }),
    ciudad: Joi.string().min(2).max(100).optional().messages({
        "string.base": "La ciudad debe ser un texto",
        "string.min": "La ciudad debe tener al menos 2 caracteres",
        "string.max": "La ciudad debe tener máximo 100 caracteres"
    }),
    pais: Joi.string().min(2).max(100).optional().messages({
        "string.base": "El país debe ser un texto",
        "string.min": "El país debe tener al menos 2 caracteres",
        "string.max": "El país debe tener máximo 100 caracteres"
    }),
    direccion: Joi.string().max(255).allow("").optional().messages({
        "string.base": "La dirección debe ser un texto",
        "string.max": "La dirección debe tener máximo 255 caracteres"
    }),
    estado: Joi.string().valid("Activo", "Inactivo").optional().messages({
        "string.base": "El estado debe ser un texto",
        "any.only": "El estado solo puede ser 'Activo' o 'Inactivo'"
    })
});

export const IdParamSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        "number.base": "El ID debe ser un número",
        "number.integer": "El ID debe ser un número entero",
        "any.required": "El ID es requerido"
    })
});
