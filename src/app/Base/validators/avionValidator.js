import Joi from "joi";

export const CreateAvionSchema = Joi.object({
    tipo: Joi.string().min(2).max(50).required().messages({
        "string.base": "El tipo debe ser un texto",
        "string.empty": "El tipo es requerido",
        "string.min": "El tipo debe tener al menos 2 caracteres",
        "string.max": "El tipo debe tener máximo 50 caracteres",
        "any.required": "El tipo es requerido"
    }),
    modelo: Joi.string().min(2).max(100).required().messages({
        "string.base": "El modelo debe ser un texto",
        "string.empty": "El modelo es requerido",
        "string.min": "El modelo debe tener al menos 2 caracteres",
        "string.max": "El modelo debe tener máximo 100 caracteres",
        "any.required": "El modelo es requerido"
    }),
    fabricante: Joi.string().min(2).max(100).required().messages({
        "string.base": "El fabricante debe ser un texto",
        "string.empty": "El fabricante es requerido",
        "string.min": "El fabricante debe tener al menos 2 caracteres",
        "string.max": "El fabricante debe tener máximo 100 caracteres",
        "any.required": "El fabricante es requerido"
    }),
    capacidad: Joi.number().integer().min(1).required().messages({
        "number.base": "La capacidad debe ser un número",
        "number.integer": "La capacidad debe ser un número entero",
        "number.min": "La capacidad debe ser al menos 1",
        "any.required": "La capacidad es requerida"
    }),
    anio_fabricacion: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional().messages({
        "number.base": "El año de fabricación debe ser un número",
        "number.integer": "El año de fabricación debe ser un número entero",
        "number.min": "El año de fabricación no puede ser menor a 1900",
        "number.max": `El año de fabricación no puede ser mayor al año actual`
    }),
    base_codigo: Joi.number().integer().min(1).required().messages({
        "number.base": "El código de base debe ser un número",
        "number.integer": "El código de base debe ser un número entero",
        "number.min": "El código de base debe ser al menos 1",
        "any.required": "El código de base es requerida"
    }),
    horas_vuelo_totales: Joi.number().integer().min(0).optional().messages({
        "number.base": "Las horas de vuelo deben ser un número",
        "number.integer": "Las horas de vuelo deben ser un número entero",
        "number.min": "Las horas de vuelo deben ser al menos 0"
    }),
});

export const UpdateAvionSchema = Joi.object({
    tipo: Joi.string().min(2).max(50).optional().messages({
        "string.base": "El tipo debe ser un texto",
        "string.min": "El tipo debe tener al menos 2 caracteres",
        "string.max": "El tipo debe tener máximo 50 caracteres"
    }),
    modelo: Joi.string().min(2).max(100).optional().messages({
        "string.base": "El modelo debe ser un texto",
        "string.min": "El modelo debe tener al menos 2 caracteres",
        "string.max": "El modelo debe tener máximo 100 caracteres"
    }),
    fabricante: Joi.string().min(2).max(100).optional().messages({
        "string.base": "El fabricante debe ser un texto",
        "string.min": "El fabricante debe tener al menos 2 caracteres",
        "string.max": "El fabricante debe tener máximo 100 caracteres"
    }),
    capacidad: Joi.number().integer().min(1).optional().messages({
        "number.base": "La capacidad debe ser un número",
        "number.integer": "La capacidad debe ser un número entero",
        "number.min": "La capacidad debe ser al menos 1"
    }),
    anio_fabricacion: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional().messages({
        "number.base": "El año de fabricación debe ser un número",
        "number.integer": "El año de fabricación debe ser un número entero",
        "number.min": "El año de fabricación no puede ser menor a 1900",
        "number.max": `El año de fabricación no puede ser mayor al año actual`
    }),
    base_codigo: Joi.number().integer().min(1).required().messages({
        "number.base": "El código de base debe ser un número",
        "number.integer": "El código de base debe ser un número entero",
        "number.min": "El código de base debe ser al menos 1",
        "any.required": "El código de base es requerida"
    }),
    horas_vuelo_totales: Joi.number().integer().min(0).optional().messages({
        "number.base": "Las horas de vuelo deben ser un número",
        "number.integer": "Las horas de vuelo deben ser un número entero",
        "number.min": "Las horas de vuelo deben ser al menos 0"
    }),
});

export const IdParamSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        "number.base": "El ID debe ser un número",
        "number.integer": "El ID debe ser un número entero",
        "any.required": "El ID es requerido"
    })
});
