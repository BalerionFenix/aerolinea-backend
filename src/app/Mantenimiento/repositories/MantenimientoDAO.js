const { Mantenimiento, TipoMantenimiento, Aeronave } = require('../../../models/associations');

class MantenimientoDAO {
    
    static async crear(mantenimientoData) {
        try {
            return await Mantenimiento.create(mantenimientoData);
        } catch (error) {
            throw error;
        }
    }

    static async obtenerTodos(pagina = 1, limite = 10) {
        try {
            const offset = (pagina - 1) * limite;
            const { count, rows } = await Mantenimiento.findAndCountAll({
                include: [
                    {
                        model: TipoMantenimiento,
                        as: 'tipo_mantenimiento',
                        attributes: ['id', 'nombre', 'descripcion']
                    },
                    {
                        model: Aeronave,
                        as: 'aeronave',
                        attributes: ['id', 'matricula', 'modelo']
                    }
                ],
                limit: limite,
                offset: offset,
                order: [['fecha_programada', 'DESC']]
            });

            return {
                total: count,
                pagina: parseInt(pagina),
                totalPaginas: Math.ceil(count / limite),
                mantenimientos: rows
            };
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPorId(id) {
        try {
            return await Mantenimiento.findByPk(id, {
                include: [
                    {
                        model: TipoMantenimiento,
                        as: 'tipo_mantenimiento'
                    },
                    {
                        model: Aeronave,
                        as: 'aeronave'
                    }
                ]
            });
        } catch (error) {
            throw error;
        }
    }

    static async actualizar(id, mantenimientoData) {
        try {
            const mantenimiento = await Mantenimiento.findByPk(id);
            if (!mantenimiento) {
                return null;
            }
            await mantenimiento.update(mantenimientoData);
            return mantenimiento;
        } catch (error) {
            throw error;
        }
    }

    static async eliminar(id) {
        try {
            const mantenimiento = await Mantenimiento.findByPk(id);
            if (!mantenimiento) {
                return false;
            }
            await mantenimiento.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPorAeronave(aeronaveId) {
        try {
            return await Mantenimiento.findAll({
                where: { aeronave_id: aeronaveId },
                include: [
                    {
                        model: TipoMantenimiento,
                        as: 'tipo_mantenimiento'
                    }
                ],
                order: [['fecha_programada', 'DESC']]
            });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerPorEstado(estado) {
        try {
            return await Mantenimiento.findAll({
                where: { estado },
                include: [
                    {
                        model: TipoMantenimiento,
                        as: 'tipo_mantenimiento'
                    },
                    {
                        model: Aeronave,
                        as: 'aeronave'
                    }
                ],
                order: [['fecha_programada', 'DESC']]
            });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerProximos(limite = 5) {
        try {
            const mantenimientos = await Mantenimiento.findAll({
                where: { estado: 'programado' },
                include: [
                    {
                        model: TipoMantenimiento,
                        as: 'tipo_mantenimiento',
                        attributes: ['id', 'nombre']
                    },
                    {
                        model: Aeronave,
                        as: 'aeronave',
                        attributes: ['id', 'matricula', 'modelo']
                    }
                ],
                order: [['fecha_programada', 'ASC']],
                limit: parseInt(limite)
            });
            return mantenimientos;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerEstadisticas() {
        try {
            const mantenimientos = await Mantenimiento.findAll();
            
            const estadisticas = {
                total: mantenimientos.length,
                programados: mantenimientos.filter(m => m.estado === 'programado').length,
                en_proceso: mantenimientos.filter(m => m.estado === 'en_proceso').length,
                completados: mantenimientos.filter(m => m.estado === 'completado').length,
                cancelados: mantenimientos.filter(m => m.estado === 'cancelado').length
            };

            return estadisticas;
        } catch (error) {
            throw error;
        }
    }

    static async contarPorTipoMantenimiento() {
        try {
            const resultados = await Mantenimiento.findAll({
                attributes: [
                    'tipo_mantenimiento_id',
                    [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']
                ],
                group: ['tipo_mantenimiento_id'],
                include: [
                    {
                        model: TipoMantenimiento,
                        as: 'tipo_mantenimiento',
                        attributes: ['id', 'nombre']
                    }
                ],
                raw: true
            });

            return resultados;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MantenimientoDAO;