import Rol from "../models/Rol.js";

class RolDAO {

    async getAll() {
        return await Rol.findAll();
    }

    async getById(id) {
        return await Rol.findByPk(id);
    }

    async create(rolData) {
        return await Rol.create(rolData);
    }

    async update(id, updateData) {
        const rol = await Rol.findByPk(id);
        if (!rol) return null;

        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                rol[key] = updateData[key];
            }
        });

        await rol.save();
        return rol;
    }

    async delete(id) {
        const rol = await Rol.findByPk(id);
        if (!rol) return null;

        await rol.destroy();
        return true;
    }
}

export default new RolDAO();
