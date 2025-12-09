import { Sequelize } from 'sequelize';
import Mantenimiento from "../models/Mantenimiento.js";
import TipoMantenimiento from "../models/TipoMantenimiento.js";
import Avion from "../../Base/models/Avion.js";

class MantenimientoDAO {

    constructor() {
        this.includeAvionTipo = [
            { model: TipoMantenimiento, as: 'tipo_mantenimiento', attributes: ['id', 'nombre', 'descripcion'] },
            { model: Avion, as: 'avion', attributes: ['avion_codigo', 'modelo', 'tipo', 'fabricante'] }
        ];

        this.includeTipo = [
            { model: TipoMantenimiento, as: 'tipo_mantenimiento', attributes: ['id', 'nombre', 'descripcion'] }
        ];
    }

    async create(data) {
        return await Mantenimiento.create(data);
    }

    async getAll(pagina = 1, limite = 10) {
        const offset = (pagina - 1) * limite;

        const { count, rows } = await Mantenimiento.findAndCountAll({
            include: this.includeAvionTipo,
            limit: limite,
            offset: offset,
            order: [['fecha_programada', 'DESC']]
        });

        return rows; // solo devolvemos los mantenimientos, sin paginación
    }

    async getById(id) {
        return await Mantenimiento.findByPk(id, { include: this.includeAvionTipo });
    }

    async update(id, data) {
        const mantenimiento = await Mantenimiento.findByPk(id);
        if (!mantenimiento) return null;

        Object.keys(data).forEach(key => {
            if (data[key] !== undefined) mantenimiento[key] = data[key];
        });

        await mantenimiento.save();
        return mantenimiento;
    }

    async delete(id) {
        const mantenimiento = await Mantenimiento.findByPk(id);
        if (!mantenimiento) return null;
            mantenimiento.estado = false;
            await mantenimiento.save();
        //await mantenimiento.destroy();
        return true;
    }

    async getByAeronave(avionCodigo) {
        return await Mantenimiento.findAll({
            where: { avion_codigo: avionCodigo },
            include: this.includeTipo,
            order: [['fecha_programada', 'DESC']]
        });
    }

    async getByEstado(estado) {
        return await Mantenimiento.findAll({
            where: { estado },
            include: this.includeAvionTipo,
            order: [['fecha_programada', 'DESC']]
        });
    }

    async getProximos(limite = 5) {
        return await Mantenimiento.findAll({
            where: { estado: 'programado' },
            include: this.includeAvionTipo,
            order: [['fecha_programada', 'ASC']],
            limit: parseInt(limite)
        });
    }

    async getEstadisticas() {
        const mantenimientos = await Mantenimiento.findAll();
        const estados = ['programado', 'en_proceso', 'completado', 'cancelado'];

        const estadisticas = { total: mantenimientos.length };
        estados.forEach(e => {
            estadisticas[e] = mantenimientos.filter(m => m.estado === e).length;
        });

        return estadisticas;
    }

    async countByTipoMantenimiento() {
        return await Mantenimiento.findAll({
            attributes: [
                'tipo_mantenimiento_id',
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']
            ],
            group: ['tipo_mantenimiento_id'],
            include: [
                { model: TipoMantenimiento, as: 'tipo_mantenimiento', attributes: ['id', 'nombre'] }
            ],
            raw: true
        });
    }
}

export default new MantenimientoDAO();
