import Base from "../models/Base.js";

class BaseDAO {

    async getAll() {
        return await Base.findAll();
    }

    async getById(id) {
        return await Base.findByPk(id);
    }

    async create(baseData) {
        return  Base.create(baseData);
    }


    async update(id, updateData) {
        const base = await Base.findByPk(id);
        if (!base) return null;

        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                base[key] = updateData[key];
            }
        });

        await base.save();
        return base;
    }


    async delete(id) {
        const base = await Base.findByPk(id);
        if (!base) return null;
        await base.destroy();
        return true;
    }
}

export default new BaseDAO();
