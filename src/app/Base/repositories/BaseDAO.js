import Base from "../models/Base.js";

class BaseDAO {
    // Obtener todas las bases
    async getAll() {
        return await Base.findAll();
    }

    // Obtener una base por id
    async getById(id) {
        return await Base.findByPk(id);
    }

    // Crear una nueva base
    async create(baseData) {
        return  Base.create(baseData);
    }

    // Actualizar una base existente por id
    async update(id, updateData) {
        const base = await Base.findByPk(id);
        if (!base) return null;

        // Actualizamos solo los campos que vienen en updateData
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                base[key] = updateData[key];
            }
        });

        await base.save();
        return base;
    }

    // Eliminar una base por id
    async delete(id) {
        const base = await Base.findByPk(id);
        if (!base) return null;

        await base.destroy();
        return true;
    }
}

export default new BaseDAO();
