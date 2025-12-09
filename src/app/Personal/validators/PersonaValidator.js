import Joi from "joi";

export const CreatePersonaSchema = Joi.object({
    persona_codigo: Joi.number().integer().optional().messages({
        'number.base': 'El código de persona debe ser un número'
    }),
    nombre: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'El nombre no puede estar vacío',
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder los 100 caracteres',
        'any.required': 'El nombre es obligatorio'
    }),
    base_codigo: Joi.number().integer().required().messages({
        'number.base': 'El código de base debe ser un número',
        'any.required': 'El código de base es obligatorio'
    }),
    activo: Joi.boolean().optional().default(true).messages({
        'boolean.base': 'El estado activo debe ser verdadero o falso'
    })
});

export const UpdatePersonaSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).optional().messages({
        'string.empty': 'El nombre no puede estar vacío',
        'string.min': 'El nombre debe tener al menos 2 caracteres',
        'string.max': 'El nombre no puede exceder los 100 caracteres'
    }),
    base_codigo: Joi.number().integer().optional().messages({
        'number.base': 'El código de base debe ser un número'
    }),
    activo: Joi.boolean().optional().messages({
        'boolean.base': 'El estado activo debe ser verdadero o falso'
    })
});

export const CodigoParamSchema = Joi.object({
    codigo: Joi.string().required().messages({
        'string.empty': 'El código es obligatorio',
        'any.required': 'El código es obligatorio'
    })
});
