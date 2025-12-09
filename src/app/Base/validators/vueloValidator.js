import Joi from "joi";

export const CreateVueloSchema = Joi.object({

    origen: Joi.string().min(2).max(50).required().messages({
        "string.base": "El origen debe ser un texto",
        "string.empty": "El origen es requerido",
        "string.min": "El origen debe tener al menos 2 caracteres",
        "string.max": "El origen debe tener máximo 50 caracteres",
        "any.required": "El origen es requerido"
    }),

    destino: Joi.string().min(2).max(50).required().messages({
        "string.base": "El destino debe ser un texto",
        "string.empty": "El destino es requerido",
        "string.min": "El destino debe tener al menos 2 caracteres",
        "string.max": "El destino debe tener máximo 50 caracteres",
        "any.required": "El destino es requerido"
    }),

    fecha: Joi.date().required().messages({
        "date.base": "La fecha debe ser válida",
        "any.required": "La fecha es requerida"
    }),

    hora: Joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/).required().messages({
        "string.base": "La hora debe ser un texto",
        "string.empty": "La hora es requerida",
        "string.pattern.base": "La hora debe tener formato HH:MM o HH:MM:SS",
        "any.required": "La hora es requerida"
    }),

    avion_codigo: Joi.string().min(1).required().messages({
        "string.base": "El código del avión debe ser un texto",
        "string.empty": "El código del avión es requerido",
        "any.required": "El código del avión es requerido"
    }),

    piloto_codigo: Joi.string().min(1).required().messages({
        "string.base": "El código del piloto debe ser un texto",
        "string.empty": "El código del piloto es requerido",
        "any.required": "El código del piloto es requerido"
    }),

    estado: Joi.string().optional(),

    hora_salida_real: Joi.string()
        .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
        .optional()
        .messages({
            "string.pattern.base": "Formato inválido para hora de salida real"
        }),

    hora_llegada_real: Joi.string()
        .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
        .optional()
        .messages({
            "string.pattern.base": "Formato inválido para hora de llegada real"
        }),

    duracion_minutos: Joi.number().integer().min(1).optional().messages({
        "number.base": "La duración debe ser un número",
        "number.integer": "La duración debe ser un número entero",
        "number.min": "La duración mínima es 1 minuto"
    }),

    observaciones: Joi.string().max(500).optional().messages({
        "string.base": "Las observaciones deben ser texto",
        "string.max": "Máximo 500 caracteres"
    })
});


export const UpdateVueloSchema = CreateVueloSchema.fork(
    Object.keys(CreateVueloSchema.describe().keys),
    (schema) => schema.optional()
);


export const IdParamSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.base": "El número de vuelo debe ser un texto",
        "string.empty": "El número de vuelo es requerido",
        "any.required": "El número de vuelo es requerido"
    })
});
