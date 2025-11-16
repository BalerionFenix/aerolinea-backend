import Mantenimiento from "../models/Mantenimiento.js";
import TipoMantenimiento from "../models/TipoMantenimiento.js";
import { Sequelize } from 'sequelize';

class TipoMantenimientoDAO {

    static async crear(tipoData) {
        try {
            return await TipoMantenimiento.create(tipoData);
        } catch (error) {
            throw error;
        }
    }

    static async obtenerTodos() {
        try {
            return await TipoMantenimiento.findAll({
                where: { estado: true },
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPorId(id) {
        try {
            return await TipoMantenimiento.findByPk(id, {
                include: [{
                    model: Mantenimiento,
                    as: 'mantenimientos'
                }]
            });
        } catch (error) {
            throw error;
        }
    }

    static async actualizar(id, tipoData) {
        try {
            const tipo = await TipoMantenimiento.findByPk(id);
            if (!tipo) {
                return null;
            }
            await tipo.update(tipoData);
            return tipo;
        } catch (error) {
            throw error;
        }
    }

    static async eliminar(id) {
        try {
            const tipo = await TipoMantenimiento.findByPk(id);
            if (!tipo) {
                return false;
            }
            await tipo.update({ estado: false });
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerActivos() {
        try {
            return await TipoMantenimiento.findAll({
                where: { estado: true },
                order: [['nombre', 'ASC']]
            });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerConEstadisticas() {
        try {
            const tipos = await TipoMantenimiento.findAll({
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

            return tipos;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPorFrecuencia(minFrecuencia = null, maxFrecuencia = null) {
        try {
            const whereConditions = { estado: true };
            
            if (minFrecuencia !== null) {
                whereConditions.frecuencia = {
                    ...whereConditions.frecuencia,
                    [Sequelize.Op.gte]: minFrecuencia
                };
            }
            
            if (maxFrecuencia !== null) {
                whereConditions.frecuencia = {
                    ...whereConditions.frecuencia,
                    [Sequelize.Op.lte]: maxFrecuencia
                };
            }

            return await TipoMantenimiento.findAll({
                where: whereConditions,
                order: [['frecuencia', 'ASC']]
            });
        } catch (error) {
            throw error;
        }
    }

    static async existeNombre(nombre, excludeId = null) {
        try {
            const whereConditions = { 
                nombre: nombre,
                estado: true 
            };
            
            if (excludeId) {
                whereConditions.id = { [Sequelize.Op.ne]: excludeId };
            }

            const tipo = await TipoMantenimiento.findOne({
                where: whereConditions
            });

            return tipo !== null;
        } catch (error) {
            throw error;
        }
    }
}

export default new TipoMantenimientoDAO();