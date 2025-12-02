import Joi from "joi";

export const CreateMiembroSchema = Joi.object({
    // Datos de persona
    nombre: Joi.string().required().messages({
        'string.empty': 'El nombre es obligatorio',
        'any.required': 'El nombre es obligatorio'
    }),
    base_codigo: Joi.string().required().messages({
        'string.empty': 'El código de base es obligatorio',
        'any.required': 'El código de base es obligatorio'
    }),
    
    // Datos de miembro de tripulación
    cargo: Joi.string().required().messages({
        'string.empty': 'El cargo es obligatorio',
        'any.required': 'El cargo es obligatorio'
    }),
    fecha_ingreso: Joi.date().required().messages({
        'date.base': 'La fecha de ingreso debe ser una fecha válida',
        'any.required': 'La fecha de ingreso es obligatoria'
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
    base_codigo: Joi.string().optional().messages({
        'string.empty': 'El código de base no puede estar vacío'
    }),
    
    // Datos de miembro que pueden actualizarse
    cargo: Joi.string().optional().messages({
        'string.empty': 'El cargo no puede estar vacío'
    }),
    fecha_ingreso: Joi.date().optional().messages({
        'date.base': 'La fecha de ingreso debe ser una fecha válida'
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
