import MiembroTripulacionDAO from "../repositories/MiembroTripulacionDAO.js";
import PersonaDAO from "../repositories/PersonaDAO.js";
import { MiembroTripulacionInputDTO, MiembroTripulacionOutputDTO } from "../dto/MiembroTripulacionDTO.js";
import { PersonaInputDTO } from "../dto/PersonaDTO.js";
import { CreateMiembroSchema } from "../validators/MiembroTripulacionValidator.js";
import sequelize from "../../../config/config_db.js";

export const createMiembro = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { 
            nombre,
            base_codigo,
            cargo,
            fecha_ingreso,
            activo = true
        } = req.body;

        // Validar datos de entrada
        const { error } = CreateMiembroSchema.validate(req.body, { abortEarly: false });
        if (error) {
            await transaction.rollback();
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        // 1. Crear la persona primero
        const persona = await PersonaDAO.create(
            {
                nombre,
                base_codigo,
                activo
            },
            { transaction }
        );

        // 2. Crear el miembro con el mismo código de persona
        const miembro = await MiembroTripulacionDAO.create(
            {
                miembro_codigo: persona.persona_codigo, // Mismo ID que la persona
                cargo,
                fecha_ingreso,
                activo
            },
            { transaction }
        );

        await transaction.commit();
        
        // Obtener el miembro con los datos de persona incluidos
        const miembroCompleto = await MiembroTripulacionDAO.getById(miembro.miembro_codigo);
        res.status(201).json(new MiembroTripulacionOutputDTO(miembroCompleto));

    } catch (err) {
        await transaction.rollback();
        console.error("Error en createMiembro:", err);
        res.status(500).json({ 
            message: err.message || "Error al crear miembro de tripulación"
        });
    }
};

export const getMiembros = async (req, res) => {
    try {
        const miembros = await MiembroTripulacionDAO.getAll();
        res.json(miembros.map(m => new MiembroTripulacionOutputDTO(m)));
    } catch (err) {
        console.error("Error en getMiembros:", err);
        res.status(500).json({ 
            message: "Error al obtener los miembros de tripulación"
        });
    }
};

export const getMiembro = async (req, res) => {
    try {
        const { codigo } = req.params;
        
        if (!codigo) {
            return res.status(400).json({ message: "Se requiere el código del miembro" });
        }

        const miembro = await MiembroTripulacionDAO.getById(codigo);
        
        if (!miembro) {
            return res.status(404).json({ 
                message: `No se encontró ningún miembro con el código ${codigo}` 
            });
        }
        
        res.json(new MiembroTripulacionOutputDTO(miembro));
    } catch (err) {
        console.error("Error en getMiembro:", err);
        res.status(500).json({ 
            message: "Error al obtener el miembro de tripulación"
        });
    }
};

export const updateMiembro = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { codigo } = req.params;
        const updateData = req.body;

        // Validar datos de entrada
        const { error, value } = UpdateMiembroSchema.validate(updateData, { 
            abortEarly: false 
        });

        if (error) {
            await transaction.rollback();
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        // Obtener el miembro actual
        const miembro = await MiembroTripulacionDAO.getById(codigo, { transaction });
        if (!miembro) {
            await transaction.rollback();
            return res.status(404).json({ 
                message: `No se encontró ningún miembro con el código ${codigo}` 
            });
        }

        // Actualizar datos de persona si se proporcionan
        const { nombre, base_codigo, activo, ...miembroData } = value;
        
        if (nombre || base_codigo || activo !== undefined) {
            const personaData = {};
            if (nombre !== undefined) personaData.nombre = nombre;
            if (base_codigo !== undefined) personaData.base_codigo = base_codigo;
            if (activo !== undefined) personaData.activo = activo;
            
            await PersonaDAO.update(miembro.persona_codigo, personaData, { transaction });
        }

        // Actualizar datos de miembro si se proporcionan
        if (Object.keys(miembroData).length > 0) {
            await MiembroTripulacionDAO.update(
                codigo, 
                new MiembroTripulacionUpdateDTO(miembroData), 
                { transaction }
            );
        }

        await transaction.commit();
        
        // Obtener el miembro actualizado con los datos de persona
        const miembroActualizado = await MiembroTripulacionDAO.getById(codigo);
        res.json(new MiembroTripulacionOutputDTO(miembroActualizado));

    } catch (err) {
        await transaction.rollback();
        console.error("Error en updateMiembro:", err);
        res.status(500).json({ 
            message: "Error al actualizar miembro de tripulación"
        });
    }
};

export const deleteMiembro = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { codigo } = req.params;

        // Verificar si existe el miembro
        const miembro = await MiembroTripulacionDAO.getById(codigo, { transaction });
        if (!miembro) {
            await transaction.rollback();
            return res.status(404).json({ 
                message: `No se encontró ningún miembro con el código ${codigo}` 
            });
        }

        // Eliminar el miembro
        await MiembroTripulacionDAO.delete(codigo, { transaction });
        
        // Opcional: También podrías eliminar la persona asociada si lo deseas
        // await PersonaDAO.delete(miembro.persona_codigo, { transaction });

        await transaction.commit();
        res.status(204).send();

    } catch (err) {
        await transaction.rollback();
        console.error("Error en deleteMiembro:", err);
        res.status(500).json({ 
            message: "Error al eliminar miembro de tripulación"
        });
    }
};