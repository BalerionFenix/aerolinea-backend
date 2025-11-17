import UsuarioDAO from "../repositories/UsuariosDAO.js";
import { UsuarioInputDTO, UsuarioUpdateDTO, UsuarioOutputDTO } from "../dto/UsuarioDTO.js";

// Create user
export const createUsuario = async (req, res) => {
    try {
        const userData = new UsuarioInputDTO(req.body);

        if (!userData.nombre || !userData.email || !userData.rol_id) {
            return res.status(400).json({ message: "Username, name, email, password and role are required" });
        }

        const newUser = await UsuarioDAO.create(userData);
        res.status(201).json(new UsuarioOutputDTO(newUser));
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
};

// Get all users
export const getUsuarios = async (req, res) => {
    try {
        const users = await UsuarioDAO.getAll();
        res.json(users.map(user => new UsuarioOutputDTO(user)));
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
};

// Get user by id
export const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UsuarioDAO.getById(id);
        if (!user) return res.status(404).json({ message: "Usuario not found" });

        res.json(new UsuarioOutputDTO(user));
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err.message });
    }
};

export const getUsuarioByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await UsuarioDAO.getByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "Usuario not found" });
        }

        res.json(new UsuarioOutputDTO(user));
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err.message });
    }
};


// Update user by id
export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = new UsuarioUpdateDTO(req.body);

        const updatedUser = await UsuarioDAO.update(id, updateData);
        if (!updatedUser) return res.status(404).json({ message: "Usuario not found" });

        res.json(new UsuarioOutputDTO(updatedUser));
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err.message });
    }
};

// Delete user by id
export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await UsuarioDAO.delete(id);

        if (!result) return res.status(404).json({ message: "Usuario not found" });

        res.json({ message: "Usuario deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};
