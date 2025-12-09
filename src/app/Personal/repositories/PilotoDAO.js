import Piloto from "../models/Piloto.js";
import Persona from "../models/Persona.js";

class PilotoDAO {
    #include = [{ model: Persona, as: "Persona" }];

    async #findByIdWithInclude(codigo, options = {}) {
        return await Piloto.findByPk(codigo, { 
            include: [{
                model: this.#include[0].model,
                as: 'Persona',
                required: true
            }],
            ...options 
        });
    }

    async #reloadWithInclude(instance, options = {}) {
        return await instance.reload({ 
            include: [{
                model: this.#include[0].model,
                as: 'Persona',
                required: true
            }],
            ...options 
        });
    }

    async getAll(options = {}) {
        return await Piloto.findAll({ 
            include: this.#include,
            ...options 
        });
    }

    async getById(codigo, options = {}) {
        return await this.#findByIdWithInclude(codigo, options);
    }

    async create(pilotoData, options = {}) {
        // Generar código único para PILOTO (independiente de persona)
        if (!pilotoData.piloto_codigo) {
            const lastPiloto = await Piloto.findOne({
                order: [['piloto_codigo', 'DESC']],
                ...options
            });
            
            let nextId = 1;
            if (lastPiloto) {
                const lastId = parseInt(lastPiloto.piloto_codigo, 10) || 0;
                nextId = lastId + 1;
            }
            
            pilotoData.piloto_codigo = nextId;
        }

        const piloto = await Piloto.create(pilotoData, options);
        return await this.#reloadWithInclude(piloto, options);
    }

    async update(codigo, updateData, options = {}) {
        const piloto = await Piloto.findByPk(codigo, options);
        if (!piloto) return null;

        Object.assign(piloto, updateData);
        await piloto.save(options);

        return await this.#reloadWithInclude(piloto, options);
    }

    async delete(codigo) {
        const piloto = await Piloto.findByPk(codigo);
        if (!piloto) return null;
            piloto.estado = false;
            await piloto.save();
        //await piloto.destroy();
        return true;
    }
}

export default new PilotoDAO();