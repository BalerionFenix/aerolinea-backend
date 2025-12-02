import PersonaDAO from "../repositories/PersonaDAO.js";
import { PersonaInputDTO, PersonaUpdateDTO, PersonaOutputDTO } from "../dto/PersonaDTO.js";

export const createPersona = async (req, res) => {
    try {
        const personaData = new PersonaInputDTO(req.body);

        if (!personaData.nombre || !personaData.base_codigo) {
            return res.status(400).json({ message: "Nombre y código de base son requeridos" });
        }

        const newPersona = await PersonaDAO.create(personaData);
        res.status(201).json(new PersonaOutputDTO(newPersona));
    } catch (err) {
        res.status(500).json({ message: "Error al crear persona", error: err.message });
    }
};

export const getPersonas = async (req, res) => {
    try {
        const personas = await PersonaDAO.getAll();
        res.json(personas.map(p => new PersonaOutputDTO(p)));
    } catch (err) {
        res.status(500).json({ message: "Error al obtener personas", error: err.message });
    }
};

export const getPersona = async (req, res) => {
    try {
        const { codigo } = req.params;
        const persona = await PersonaDAO.getById(codigo);
        if (!persona) return res.status(404).json({ message: "Persona no encontrada" });
        res.json(new PersonaOutputDTO(persona));
    } catch (err) {
        res.status(500).json({ message: "Error al obtener persona", error: err.message });
    }
};

export const updatePersona = async (req, res) => {
    try {
        const { codigo } = req.params;
        const updateData = new PersonaUpdateDTO(req.body);
        const updated = await PersonaDAO.update(codigo, updateData);
        if (!updated) return res.status(404).json({ message: "Persona no encontrada" });
        res.json(new PersonaOutputDTO(updated));
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar persona", error: err.message });
    }
};

export const deletePersona = async (req, res) => {
    try {
        const { codigo } = req.params;
        const result = await PersonaDAO.delete(codigo);
        if (!result) return res.status(404).json({ message: "Persona no encontrada" });
        res.json({ message: "Persona eliminada exitosamente" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar persona", error: err.message });
    }
};
