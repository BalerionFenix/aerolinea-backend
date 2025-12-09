import MiembroTripulacion from "../models/MiembroTripulacion.js";
import Persona from "../models/Persona.js";

class MiembroTripulacionDAO {
    #include = [{ model: Persona, as: "Persona" }];

    async #findByIdWithInclude(codigo, options = {}) {
        return await MiembroTripulacion.findByPk(codigo, { 
            include: this.#include,
            ...options 
        });
    }

    async #reloadWithInclude(instance, options = {}) {
        return await instance.reload({ 
            include: this.#include,
            ...options 
        });
    }

    async getAll(options = {}) {
        return await MiembroTripulacion.findAll({ 
            include: this.#include,
            ...options 
        });
    }

    async getById(codigo, options = {}) {
        return await this.#findByIdWithInclude(codigo, options);
    }

    async create(miembroData, options = {}) {
        // Generar código único para MIEMBRO (independiente de persona)
        if (!miembroData.miembro_codigo) {
            const lastMiembro = await MiembroTripulacion.findOne({
                order: [['miembro_codigo', 'DESC']],
                ...options
            });
            
            let nextId = 1;
            if (lastMiembro) {
                const lastId = parseInt(lastMiembro.miembro_codigo, 10) || 0;
                nextId = lastId + 1;
            }
            
            miembroData.miembro_codigo = nextId; // Asignar como entero en lugar de cadena
        }

        const miembro = await MiembroTripulacion.create(miembroData, options);
        return await this.#reloadWithInclude(miembro, options);
    }

    async update(codigo, updateData, options = {}) {
        const miembro = await MiembroTripulacion.findByPk(codigo, options);
        if (!miembro) return null;

        await miembro.update(updateData, options);
        return await this.#reloadWithInclude(miembro, options);
    }

    async delete(codigo, options = {}) {
        const miembro = await MiembroTripulacion.findByPk(codigo, options);
        if (!miembro) return null;

        await miembro.destroy(options);
        return true;
    }
}

export default new MiembroTripulacionDAO();