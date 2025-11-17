import Joi from "joi";

// Validator para crear usuario
export const CreateUsuarioSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre es requerido",
        "string.min": "El nombre debe tener al menos 2 caracteres",
        "string.max": "El nombre debe tener máximo 100 caracteres",
        "any.required": "El nombre es requerido"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "El email debe ser un texto",
        "string.email": "El email debe ser válido",
        "any.required": "El email es requerido"
    }),
    rol_id: Joi.number().integer().required().messages({
        "number.base": "El rol debe ser un número",
        "number.integer": "El rol debe ser un número entero",
        "any.required": "El rol es requerido"
    }),
    base_codigo: Joi.number().integer().optional().messages({
        "number.base": "El código de base debe ser un número",
        "number.integer": "El código de base debe ser un número entero"
    }),
    persona_codigo: Joi.string().allow(null, "").optional().messages({
        "string.base": "El código de persona debe ser un texto"
    }),
    activo: Joi.boolean().optional().default(true)
});

// Validator para actualizar usuario (parcial)
export const UpdateUsuarioSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).optional().messages({
        "string.base": "El nombre debe ser un texto",
        "string.min": "El nombre debe tener al menos 2 caracteres",
        "string.max": "El nombre debe tener máximo 100 caracteres"
    }),
    email: Joi.string().email().optional().messages({
        "string.base": "El email debe ser un texto",
        "string.email": "El email debe ser válido"
    }),
    rol_id: Joi.number().integer().optional().messages({
        "number.base": "El rol debe ser un número",
        "number.integer": "El rol debe ser un número entero"
    }),
    base_codigo: Joi.number().integer().optional().messages({
        "number.base": "El código de base debe ser un número",
        "number.integer": "El código de base debe ser un número entero"
    }),
    persona_codigo: Joi.string().allow(null, "").optional().messages({
        "string.base": "El código de persona debe ser un texto"
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
export const EmailParamSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "El correo no tiene un formato válido",
        "any.required": "El correo es requerido"
    })
});

