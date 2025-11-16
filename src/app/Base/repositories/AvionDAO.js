import Avion from "../models/Avion.js";

class AvionDAO {
    // Obtener todos los aviones
    async getAll() {
        return await Avion.findAll();
    }

    // Obtener un avión por su código
    async getById(avion_codigo) {
        return await Avion.findByPk(avion_codigo);
    }

    // Crear un nuevo avión
    async create(avionData) {
        return await Avion.create(avionData);
    }

    // Actualizar un avión existente
    async update(avion_codigo, updateData) {
        const avion = await Avion.findByPk(avion_codigo);
        if (!avion) return null;

        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                avion[key] = updateData[key];
            }
        });

        await avion.save();
        return avion;
    }

    // Eliminar un avión
    async delete(avion_codigo) {
        const avion = await Avion.findByPk(avion_codigo);
        if (!avion) return null;

        await avion.destroy();
        return true;
    }
}

export default new AvionDAO();