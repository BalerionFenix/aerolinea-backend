import PilotoDAO from "../repositories/PilotoDAO.js";
import PersonaDAO from "../repositories/PersonaDAO.js";
import { PilotoInputDTO, PilotoUpdateDTO, PilotoOutputDTO } from "../dto/PilotoDTO.js";
import { PersonaInputDTO } from "../dto/PersonaDTO.js";
import { CreatePilotoSchema, UpdatePilotoSchema } from "../validators/PilotoValidator.js";
import sequelize from "../../../config/config_db.js";

export const createPiloto = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { 
            nombre,
            base_codigo,
            horas_vuelo,
            licencia,
            fecha_vencimiento_licencia,
            certificaciones,
            activo = true
        } = req.body;

        // Validar datos de entrada
        const { error } = CreatePilotoSchema.validate(req.body, { abortEarly: false });
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

        // 2. Crear el piloto con código independiente
        const pilotoData = new PilotoInputDTO({
            persona_codigo: persona.persona_codigo,
            horas_vuelo: horas_vuelo || 0,
            licencia,
            fecha_vencimiento_licencia,
            certificaciones: certificaciones || [],
            activo
        });

        const piloto = await PilotoDAO.create(pilotoData, { transaction });

        await transaction.commit();
        
        // Obtener el piloto con los datos de persona incluidos
        const pilotoCompleto = await PilotoDAO.getById(piloto.piloto_codigo);
        res.status(201).json(new PilotoOutputDTO(pilotoCompleto));

    } catch (err) {
        await transaction.rollback();
        console.error("Error en createPiloto:", err);
        res.status(500).json({ 
            message: "Error al crear piloto", 
            error: err.message 
        });
    }
};

export const getPilotos = async (req, res) => {
    try {
        const pilotos = await PilotoDAO.getAll();
        res.json(pilotos.map(p => new PilotoOutputDTO(p)));
    } catch (err) {
        console.error("Error en getPilotos:", err);
        res.status(500).json({ 
            message: "Error al obtener pilotos", 
            error: err.message 
        });
    }
};

export const getPiloto = async (req, res) => {
    try {
        const { codigo } = req.params;
        
        if (!codigo) {
            return res.status(400).json({ message: "Se requiere el código del piloto" });
        }

        const piloto = await PilotoDAO.getById(codigo);
        
        if (!piloto) {
            return res.status(404).json({ 
                message: `No se encontró ningún piloto con el código ${codigo}` 
            });
        }
        
        res.json(new PilotoOutputDTO(piloto));
    } catch (err) {
        console.error("Error en getPiloto:", err);
        res.status(500).json({ 
            message: "Error al obtener el piloto", 
            error: err.message 
        });
    }
};

export const updatePiloto = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { codigo } = req.params;
        const updateData = req.body;

        // Validar datos de entrada
        const { error, value } = UpdatePilotoSchema.validate(updateData, { 
            abortEarly: false 
        });

        if (error) {
            await transaction.rollback();
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({ errors });
        }

        // Verificar si existe el piloto
        const pilotoExistente = await PilotoDAO.getById(codigo);
        if (!pilotoExistente) {
            await transaction.rollback();
            return res.status(404).json({ 
                message: `No se encontró ningún piloto con el código ${codigo}` 
            });
        }

        // Separar datos de persona y piloto
        const { nombre, base_codigo, activo, ...pilotoData } = value;
        
        // Actualizar datos de persona si se proporcionan
        if (nombre !== undefined || base_codigo !== undefined || activo !== undefined) {
            const personaUpdateData = {};
            if (nombre !== undefined) personaUpdateData.nombre = nombre;
            if (base_codigo !== undefined) personaUpdateData.base_codigo = base_codigo;
            if (activo !== undefined) personaUpdateData.activo = activo;
            
            // Usar persona_codigo del piloto para actualizar
            await PersonaDAO.update(pilotoExistente.Persona.persona_codigo, personaUpdateData, { transaction });
        }

        // Actualizar datos específicos de piloto si se proporcionan
        if (Object.keys(pilotoData).length > 0) {
            await PilotoDAO.update(
                codigo, 
                new PilotoUpdateDTO(pilotoData), 
                { transaction }
            );
        }

        await transaction.commit();
        
        // Obtener el piloto actualizado
        const pilotoActualizado = await PilotoDAO.getById(codigo);
        res.json(new PilotoOutputDTO(pilotoActualizado));

    } catch (err) {
        await transaction.rollback();
        console.error("Error en updatePiloto:", err);
        res.status(500).json({ 
            message: "Error al actualizar piloto", 
            error: err.message 
        });
    }
};

export const deletePiloto = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { codigo } = req.params;

        // Verificar si existe el piloto
        const piloto = await PilotoDAO.getById(codigo);
        if (!piloto) {
            await transaction.rollback();
            return res.status(404).json({ 
                message: `No se encontró ningún piloto con el código ${codigo}` 
            });
        }

        // Guardar el persona_codigo antes de eliminar
        const personaCodigo = piloto.Persona.persona_codigo;

        // Eliminar el piloto
        await PilotoDAO.delete(codigo, { transaction });
        
        // Opcional: También eliminar la persona asociada
        await PersonaDAO.delete(personaCodigo, { transaction });

        await transaction.commit();
        res.status(204).send();

    } catch (err) {
        await transaction.rollback();
        console.error("Error en deletePiloto:", err);
        res.status(500).json({ 
            message: "Error al eliminar piloto", 
            error: err.message 
        });
    }
};