import MiembroTripulacionDAO from "../repositories/MiembroTripulacionDAO.js";
import PersonaDAO from "../repositories/PersonaDAO.js";
import { MiembroTripulacionInputDTO, MiembroTripulacionUpdateDTO, MiembroTripulacionOutputDTO } from "../dto/MiembroTripulacionDTO.js";
import { PersonaInputDTO } from "../dto/PersonaDTO.js";
import { CreateMiembroSchema, UpdateMiembroSchema } from "../validators/MiembroTripulacionValidator.js";
import sequelize from "../../../config/config_db.js";

export const createMiembro = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { 
            nombre,
            base_codigo,
            cargo,
            activo = true
        } = req.body;

        // Validar datos de entrada
        const { error } = CreateMiembroSchema.validate(req.body, { abortEarly: false });
        if (error) {
            await transaction.rollback();
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        // 1. Crear la persona
        const personaData = new PersonaInputDTO({
            nombre,
            base_codigo,
            activo
        });

        const persona = await PersonaDAO.create(personaData, { transaction });

        //console.log("Persona creada con código:", persona.persona_codigo);

        // 2. Crear el miembro con código independiente
        const miembroData = new MiembroTripulacionInputDTO({
            persona_codigo: persona.persona_codigo,
            cargo,
            activo
        });

        const miembro = await MiembroTripulacionDAO.create(miembroData, { transaction });

        await transaction.commit();
        
        // Obtener el miembro con los datos de persona incluidos
        const miembroCompleto = await MiembroTripulacionDAO.getById(miembro.miembro_codigo);
        res.status(201).json(new MiembroTripulacionOutputDTO(miembroCompleto));

    } catch (err) {
        await transaction.rollback();
        console.error("Error en createMiembro:", err);
        res.status(500).json({ 
            message: "Error al crear miembro de tripulación", 
            error: err.message 
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
            message: "Error al obtener miembros", 
            error: err.message 
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
            message: "Error al obtener el miembro", 
            error: err.message 
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

        // Verificar si existe el miembro
        const miembroExistente = await MiembroTripulacionDAO.getById(codigo);
        if (!miembroExistente) {
            await transaction.rollback();
            return res.status(404).json({ 
                message: `No se encontró ningún miembro con el código ${codigo}` 
            });
        }

        // Separar datos de persona y miembro
        const { nombre, base_codigo, activo, ...miembroData } = value;
        
        // Actualizar datos de persona si se proporcionan
        if (nombre !== undefined || base_codigo !== undefined || activo !== undefined) {
            const personaUpdateData = {};
            if (nombre !== undefined) personaUpdateData.nombre = nombre;
            if (base_codigo !== undefined) personaUpdateData.base_codigo = base_codigo;
            if (activo !== undefined) personaUpdateData.activo = activo;
            
            // Usar persona_codigo del miembro para actualizar
            await PersonaDAO.update(miembroExistente.Persona.persona_codigo, personaUpdateData, { transaction });
        }

        // Actualizar datos específicos de miembro si se proporcionan
        if (Object.keys(miembroData).length > 0) {
            await MiembroTripulacionDAO.update(
                codigo, 
                new MiembroTripulacionUpdateDTO(miembroData), 
                { transaction }
            );
        }

        await transaction.commit();
        
        // Obtener el miembro actualizado
        const miembroActualizado = await MiembroTripulacionDAO.getById(codigo);
        res.json(new MiembroTripulacionOutputDTO(miembroActualizado));

    } catch (err) {
        await transaction.rollback();
        console.error("Error en updateMiembro:", err);
        res.status(500).json({ 
            message: "Error al actualizar miembro", 
            error: err.message 
        });
    }
};

export const deleteMiembro = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { codigo } = req.params;

        // Verificar si existe el miembro
        const miembro = await MiembroTripulacionDAO.getById(codigo);
        if (!miembro) {
            await transaction.rollback();
            return res.status(404).json({ 
                message: `No se encontró ningún miembro con el código ${codigo}` 
            });
        }

        // Guardar el persona_codigo antes de eliminar
        const personaCodigo = miembro.Persona.persona_codigo;

        // Eliminar el miembro
        await MiembroTripulacionDAO.delete(codigo, { transaction });
        
        // Opcional: También eliminar la persona asociada
        await PersonaDAO.delete(personaCodigo, { transaction });

        await transaction.commit();
        res.status(204).send();

    } catch (err) {
        await transaction.rollback();
        console.error("Error en deleteMiembro:", err);
        res.status(500).json({ 
            message: "Error al eliminar miembro", 
            error: err.message 
        });
    }
};