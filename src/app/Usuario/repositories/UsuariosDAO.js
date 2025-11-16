import Usuario from "../models/Usuario.js";
import Rol from "../models/Rol.js";

class UsuarioDAO {

    #include = [{ model: Rol, as: "rol" }];

    async #findByIdWithInclude(id) {
        return await Usuario.findByPk(id, { include: this.#include });
    }

    async #reloadWithInclude(instance) {
        return await instance.reload({ include: this.#include });
    }


    async getAll() {
        return await Usuario.findAll({ include: this.#include });
    }

    async getById(id) {
        return await this.#findByIdWithInclude(id);
    }

    async getByEmail(email) {
        return await Usuario.findOne({
            where: { email },
            include: this.#include,
        });
    }


    async create(userData) {
        const user = await Usuario.create(userData);
        return await this.#reloadWithInclude(user);
    }

    async update(id, updateData) {
        const user = await Usuario.findByPk(id);
        if (!user) return null;

        Object.assign(user, updateData); // Limpio y DRY
        await user.save();

        return await this.#reloadWithInclude(user);
    }

    async delete(id) {
        const user = await Usuario.findByPk(id);
        if (!user) return null;

        await user.destroy();
        return true;
    }
}

export default new UsuarioDAO();
