import Joi from "joi";

export const CreateMiembroSchema = Joi.object({
    // Datos de persona
    nombre: Joi.string().required().messages({
        'string.empty': 'El nombre es obligatorio',
        'any.required': 'El nombre es obligatorio'
    }),
    base_codigo: Joi.number().integer().required().messages({
        'number.base': 'El código de base debe ser un número',
        'any.required': 'El código de base es obligatorio'
    }),
    
    // Datos de miembro de tripulación
    cargo: Joi.string().optional().allow('', null).messages({
        'string.base': 'El cargo debe ser un texto'
    }),
    activo: Joi.boolean().default(true).messages({
        'boolean.base': 'El estado activo debe ser verdadero o falso'
    })
});

export const UpdateMiembroSchema = Joi.object({
    // Datos de persona que pueden actualizarse
    nombre: Joi.string().optional().messages({
        'string.empty': 'El nombre no puede estar vacío'
    }),
    base_codigo: Joi.number().integer().optional().messages({
        'number.base': 'El código de base debe ser un número'
    }),
    
    // Datos de miembro que pueden actualizarse
    cargo: Joi.string().optional().allow('', null).messages({
        'string.base': 'El cargo debe ser un texto'
    }),
    activo: Joi.boolean().optional().messages({
        'boolean.base': 'El estado activo debe ser verdadero o falso'
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