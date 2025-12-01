import PilotoDAO from "../repositories/PilotoDAO.js";
import PersonaDAO from "../repositories/PersonaDAO.js";
import { PilotoInputDTO, PilotoUpdateDTO, PilotoOutputDTO } from "../dto/PilotoDTO.js";
import { PersonaInputDTO } from "../dto/PersonaDTO.js";
import sequelize from "../../../config/config_db.js";

export const createPiloto = async (req, res) => {
    const transaction = await sequelize.transaction();
    
    try {
        const { 
            // Datos de persona
            nombre,
            base_codigo,
            // Datos de piloto
            horas_vuelo,
            licencia,
            fecha_vencimiento_licencia,
            certificaciones,
            activo = true
        } = req.body;

        // Validaciones básicas
        if (!nombre || !base_codigo) {
            await transaction.rollback();
            return res.status(400).json({ 
                message: "Nombre y base_codigo son requeridos" 
            });
        }

        if (!licencia || !fecha_vencimiento_licencia) {
            await transaction.rollback();
            return res.status(400).json({ 
                message: "Licencia y fecha de vencimiento son requeridos" 
            });
        }

        // 1. Crear la persona
        const personaData = new PersonaInputDTO({
            nombre,
            base_codigo,
            activo
        });

        const persona = await PersonaDAO.create(personaData, { transaction });

        // 2. Crear el piloto con el mismo código de persona
        const pilotoData = new PilotoInputDTO({
            piloto_codigo: persona.persona_codigo, // Mismo ID que la persona
            persona_codigo: persona.persona_codigo,
            horas_vuelo: horas_vuelo || 0,
            licencia,
            fecha_vencimiento_licencia,
            certificaciones: certificaciones || [],
            activo
        });

        const piloto = await PilotoDAO.create(pilotoData, { transaction });

        // Si todo sale bien, hacemos commit
        await transaction.commit();
        
        // Obtenemos el piloto con los datos de persona incluidos
        const pilotoCompleto = await PilotoDAO.getById(piloto.piloto_codigo);
        res.status(201).json(new PilotoOutputDTO(pilotoCompleto));

    } catch (err) {
        // Si hay error, hacemos rollback
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
        res.status(500).json({ message: "Error al obtener pilotos", error: err.message });
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
    try {
        const { codigo } = req.params;
        const updateData = new PilotoUpdateDTO(req.body);
        const updated = await PilotoDAO.update(codigo, updateData);
        if (!updated) return res.status(404).json({ message: "Piloto no encontrado" });
        res.json(new PilotoOutputDTO(updated));
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar piloto", error: err.message });
    }
};

export const deletePiloto = async (req, res) => {
    try {
        const { codigo } = req.params;
        const result = await PilotoDAO.delete(codigo);
        if (!result) return res.status(404).json({ message: "Piloto no encontrado" });
        res.json({ message: "Piloto eliminado" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar piloto", error: err.message });
    }
};
