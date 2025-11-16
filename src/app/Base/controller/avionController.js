import AvionDAO from "../repositories/AvionDAO.js"
import {AvionInputDTO, AvionUpdateDTO, AvionOutputDTO} from "../dto/AvionDTO.js";

// Create avión
export const createAvion = async (req, res) => {
    try {
        const avionData = new AvionInputDTO(req.body);
        const newAvion = await AvionDAO.create(avionData);
        res.status(201).json(new AvionOutputDTO(newAvion));
    } catch (err) {
        res.status(500).json({ message: "Error creating avión", error: err });
    }
};

// Get all aviones
export const getAviones = async (req, res) => {
    try {
        const aviones = await AvionDAO.getAll();
        res.json(aviones.map(avion => new AvionOutputDTO(avion)));
    } catch (err) {
        res.status(500).json({ message: "Error fetching aviones", error: err });
    }
};

// Get avión by id
export const getAvion = async (req, res) => {
    try {
        const { id } = req.params;
        const avion = await AvionDAO.getById(id);

        if (!avion) return res.status(404).json({ message: "Avión not found" });

        res.json(new AvionOutputDTO(avion));
    } catch (err) {
        res.status(500).json({ message: "Error fetching avión", error: err });
    }
};

// Update avión by id
export const updateAvion = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = new AvionUpdateDTO(req.body);

        const avion = await AvionDAO.update(id, updateData);

        if (!avion) return res.status(404).json({ message: "Avión not found" });

        res.json(new AvionOutputDTO(avion));
    } catch (err) {
        res.status(500).json({ message: "Error updating avión", error: err });
    }
};

// Delete avión by id
export const deleteAvion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await AvionDAO.delete(id);

        if (!result) return res.status(404).json({ message: "Avión not found" });

        res.json({ message: "Avión deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting avión", error: err });
    }
};