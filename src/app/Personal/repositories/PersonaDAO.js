import Persona from "../models/Persona.js";

class PersonaDAO {
    async create(personaData, options = {}) {
        // Si no se proporciona un código, generamos uno numérico
        if (!personaData.persona_codigo) {
            const lastPerson = await Persona.findOne({
                order: [['persona_codigo', 'DESC']],
                ...options
            });
            
            let nextId = 1;
            if (lastPerson) {
                const lastId = parseInt(lastPerson.persona_codigo, 10) || 0;
                nextId = lastId + 1;
            }
            
            personaData.persona_codigo = nextId;
        }

        return await Persona.create(personaData, options);
    }

    async getById(codigo, options = {}) {
        return await Persona.findByPk(codigo, options);
    }

    async getAll(options = {}) {
        return await Persona.findAll(options);
    }

    async update(codigo, updateData, options = {}) {
        const persona = await Persona.findByPk(codigo, options);
        if (!persona) return null;

        Object.assign(persona, updateData);
        await persona.save(options);
        return persona;
    }

    async delete(codigo, options = {}) {
        const result = await Persona.destroy({ 
            where: { persona_codigo: codigo },
            ...options
        });
        return result > 0;
    }
}

export default new PersonaDAO();
