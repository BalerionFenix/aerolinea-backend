import Joi from "joi";

export const CreatePilotoSchema = Joi.object({
    // Datos de persona
    nombre: Joi.string().required().messages({
        'string.empty': 'El nombre es obligatorio',
        'any.required': 'El nombre es obligatorio'
    }),
    base_codigo: Joi.number().integer().required().messages({
        'number.base': 'El código de base debe ser un número',
        'any.required': 'El código de base es obligatorio'
    }),
    
    // Datos de piloto
    horas_vuelo: Joi.number().integer().min(0).default(0).messages({
        'number.base': 'Las horas de vuelo deben ser un número',
        'number.integer': 'Las horas de vuelo deben ser un número entero',
        'number.min': 'Las horas de vuelo no pueden ser negativas'
    }),
    licencia: Joi.string().required().messages({
        'string.empty': 'El número de licencia es obligatorio',
        'any.required': 'El número de licencia es obligatorio'
    }),
    fecha_vencimiento_licencia: Joi.date().greater('now').required().messages({
        'date.base': 'La fecha de vencimiento debe ser una fecha válida',
        'date.greater': 'La fecha de vencimiento debe ser posterior a la fecha actual',
        'any.required': 'La fecha de vencimiento es obligatoria'
    }),
    certificaciones: Joi.array().items(Joi.string()).default([]).messages({
        'array.base': 'Las certificaciones deben ser un arreglo',
        'string.base': 'Cada certificación debe ser un texto'
    }),
    activo: Joi.boolean().default(true).messages({
        'boolean.base': 'El estado activo debe ser verdadero o falso'
    })
});

export const UpdatePilotoSchema = Joi.object({
    // Datos de persona que pueden actualizarse
    nombre: Joi.string().optional().messages({
        'string.empty': 'El nombre no puede estar vacío'
    }),
    base_codigo: Joi.number().integer().optional().messages({
        'number.base': 'El código de base debe ser un número'
    }),
    activo: Joi.boolean().optional().messages({
        'boolean.base': 'El estado activo debe ser verdadero o falso'
    }),
    
    // Datos específicos de piloto - TODOS OPCIONALES
    horas_vuelo: Joi.number().integer().min(0).optional().messages({
        'number.base': 'Las horas de vuelo deben ser un número',
        'number.integer': 'Las horas de vuelo deben ser un número entero',
        'number.min': 'Las horas de vuelo no pueden ser negativas'
    }),
    licencia: Joi.string().optional().messages({
        'string.empty': 'El número de licencia no puede estar vacío'
    }),
    fecha_vencimiento_licencia: Joi.date().greater('now').optional().messages({
        'date.base': 'La fecha de vencimiento debe ser una fecha válida',
        'date.greater': 'La fecha de vencimiento debe ser posterior a la fecha actual'
    }),
    certificaciones: Joi.array().items(Joi.string()).optional().messages({
        'array.base': 'Las certificaciones deben ser un arreglo',
        'string.base': 'Cada certificación debe ser un texto'
    })
}).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar'
});

export const CodigoParamSchema = Joi.object({
    codigo: Joi.string().required().messages({
        'string.empty': 'El código es obligatorio',
        'any.required': 'El código es obligatorio'
    })
});