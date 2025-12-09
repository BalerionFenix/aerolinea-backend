import Mantenimiento from "../models/Mantenimiento.js";
import TipoMantenimiento from "../models/TipoMantenimiento.js";
import { Sequelize, Op } from "sequelize";

class TipoMantenimientoDAO {

    async crear(tipoData) {
        return await TipoMantenimiento.create(tipoData);
    }

    async obtenerTodos() {
        return await TipoMantenimiento.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });
    }

    async obtenerPorId(id) {
        return await TipoMantenimiento.findByPk(id);
    }



    async actualizar(id, tipoData) {
        const tipo = await TipoMantenimiento.findByPk(id);
        if (!tipo) return null;

        Object.keys(tipoData).forEach(key => {
            if (tipoData[key] !== undefined) {
                tipo[key] = tipoData[key];
            }
        });

        await tipo.save();
        return tipo;
    }

    async eliminar(id) {
        const tipo = await TipoMantenimiento.findByPk(id);
        if (!tipo) return null;

        // borrado lógico
        tipo.estado = false;
        await tipo.save();
        return true;
    }

    async obtenerActivos() {
        return await TipoMantenimiento.findAll({
            where: { estado: true },
            order: [['nombre', 'ASC']]
        });
    }

    async obtenerConEstadisticas() {
        return await TipoMantenimiento.findAll({
            where: { estado: true },
            include: [{
                model: Mantenimiento,
                as: 'mantenimientos',
                attributes: []
            }],
            attributes: {
                include: [
                    [
                        Sequelize.fn('COUNT', Sequelize.col('mantenimientos.id')),
                        'total_mantenimientos'
                    ]
                ]
            },
            group: ['TipoMantenimiento.id'],
            order: [['nombre', 'ASC']]
        });
    }

    async obtenerPorFrecuencia(minFrecuencia = null, maxFrecuencia = null) {
        const whereConditions = { estado: true };

        if (minFrecuencia !== null) {
            whereConditions.frecuencia = {
                ...whereConditions.frecuencia,
                [Op.gte]: minFrecuencia
            };
        }

        if (maxFrecuencia !== null) {
            whereConditions.frecuencia = {
                ...whereConditions.frecuencia,
                [Op.lte]: maxFrecuencia
            };
        }

        return await TipoMantenimiento.findAll({
            where: whereConditions,
            order: [['frecuencia', 'ASC']]
        });
    }

    async existeNombre(nombre, excludeId = null) {
        const whereConditions = {
            nombre,
            estado: true
        };

        if (excludeId) {
            whereConditions.id = { [Op.ne]: excludeId };
        }

        const tipo = await TipoMantenimiento.findOne({ where: whereConditions });
        return tipo !== null;
    }
}

export default new TipoMantenimientoDAO();
