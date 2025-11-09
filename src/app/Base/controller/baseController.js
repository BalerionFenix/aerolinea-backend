import BaseDAO from "../repositories/BaseDAO.js";
import { BaseInputDTO, BaseUpdateDTO, BaseOutputDTO } from "../dto/BaseDTO.js";

// Create base
export const createBase = async (req, res) => {
    try {
        const baseData = new BaseInputDTO(req.body);

        if (!baseData.nombre || !baseData.ciudad || !baseData.pais) {
            return res.status(400).json({ message: "Name, city, and country are required" });
        }

        const newBase = await BaseDAO.create(baseData);
        res.status(201).json(new BaseOutputDTO(newBase));
    } catch (err) {
        res.status(500).json({ message: "Error creating base", error: err });
    }
};

// Get all bases
export const getBases = async (req, res) => {
    try {
        const bases = await BaseDAO.getAll();
        res.json(bases.map(base => new BaseOutputDTO(base)));
    } catch (err) {
        res.status(500).json({ message: "Error fetching bases", error: err });
    }
};

// Get base by id
export const getBase = async (req, res) => {
    try {
        const { id } = req.params;
        const base = await BaseDAO.getById(id);

        if (!base) return res.status(404).json({ message: "Base not found" });

        res.json(new BaseOutputDTO(base));
    } catch (err) {
        res.status(500).json({ message: "Error fetching base", error: err });
    }
};

// Update base by id
export const updateBase = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = new BaseUpdateDTO(req.body);

        const base = await BaseDAO.update(id, updateData);

        if (!base) return res.status(404).json({ message: "Base not found" });

        res.json(new BaseOutputDTO(base));
    } catch (err) {
        res.status(500).json({ message: "Error updating base", error: err });
    }
};

// Delete base by id
export const deleteBase = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await BaseDAO.delete(id);

        if (!result) return res.status(404).json({ message: "Base not found" });

        res.json({ message: "Base deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting base", error: err });
    }
};
