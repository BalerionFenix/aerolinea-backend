import RolDAO from "../repositories/RolDAO.js";
import { RolInputDTO, RolUpdateDTO, RolOutputDTO } from "../dto/RolDTO.js";

// Create role
export const createRol = async (req, res) => {
    try {
        const rolData = new RolInputDTO(req.body);

        if (!rolData.nombre) {
            return res.status(400).json({ message: "Role name is required" });
        }

        const newRol = await RolDAO.create(rolData);
        res.status(201).json(new RolOutputDTO(newRol));
    } catch (err) {
        res.status(500).json({ message: "Error creating role", error: err.message });
    }
};

// Get all roles
export const getRoles = async (req, res) => {
    try {
        const roles = await RolDAO.getAll();
        res.json(roles.map(rol => new RolOutputDTO(rol)));
    } catch (err) {
        res.status(500).json({ message: "Error fetching roles", error: err.message });
    }
};

// Get role by id
export const getRol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await RolDAO.getById(id);
        if (!rol) return res.status(404).json({ message: "Role not found" });

        res.json(new RolOutputDTO(rol));
    } catch (err) {
        res.status(500).json({ message: "Error fetching role", error: err.message });
    }
};

// Update role by id
export const updateRol = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = new RolUpdateDTO(req.body);

        const updatedRol = await RolDAO.update(id, updateData);
        if (!updatedRol) return res.status(404).json({ message: "Role not found" });

        res.json(new RolOutputDTO(updatedRol));
    } catch (err) {
        res.status(500).json({ message: "Error updating role", error: err.message });
    }
};

// Delete role by id
export const deleteRol = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await RolDAO.delete(id);

        if (!result) return res.status(404).json({ message: "Role not found" });

        res.json({ message: "Role deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting role", error: err.message });
    }
};
