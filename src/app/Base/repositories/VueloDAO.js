import Vuelo from "../models/Vuelo.js";

class VueloDAO {

    async getAll() {
        return await Vuelo.findAll();
    }

    async getById(vuelo_num) {
        return await Vuelo.findByPk(vuelo_num);
    }

    // Generar ID automático: VUE-001, VUE-002, etc.
    async generarCodigoVuelo() {
        const ultimo = await Vuelo.findOne({
            order: [["vuelo_num", "DESC"]],
        });

        if (!ultimo) return "VUE-001";

        // Extraer número del código
        const numero = parseInt(ultimo.vuelo_num.split("-")[1]);

        const nuevo = numero + 1;
        const padded = String(nuevo).padStart(3, "0");

        return `VUE-${padded}`;
    }

    async create(vueloData) {
        // Generar vuelo_num automático
        const vuelo_num = await this.generarCodigoVuelo();

        return await Vuelo.create({
            vuelo_num,
            ...vueloData
        });
    }

    async update(vuelo_num, updateData) {
        const vuelo = await Vuelo.findByPk(vuelo_num);
        if (!vuelo) return null;

        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                vuelo[key] = updateData[key];
            }
        });

        await vuelo.save();
        return vuelo;
    }

    async delete(vuelo_num) {
        const vuelo = await Vuelo.findByPk(vuelo_num);
        if (!vuelo) return null;

        await vuelo.destroy();
        return true;
    }
}

export default new VueloDAO();
