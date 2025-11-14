const MantenimientoDAO = require('../dao/MantenimientoDAO'); // Cambio aquí
const { MantenimientoDTO } = require('../dto/MantenimientoDTO');
const { validationResult } = require('express-validator');

class MantenimientoController {
    
    static async crearMantenimiento(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const mantenimiento = await MantenimientoDAO.crear(req.body); // Cambio aquí
            const mantenimientoDTO = new MantenimientoDTO(mantenimiento);
            
            res.status(201).json({
                success: true,
                message: 'Mantenimiento creado exitosamente',
                data: mantenimientoDTO
            });
        } catch (error) {
            console.error('Error al crear mantenimiento:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerMantenimientos(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { pagina = 1, limite = 10, estado, aeronave_id } = req.query;
            
            let resultado;
            if (estado) {
                resultado = await MantenimientoDAO.obtenerPorEstado(estado); // Cambio aquí
            } else if (aeronave_id) {
                resultado = await MantenimientoDAO.obtenerPorAeronave(aeronave_id); // Cambio aquí
            } else {
                resultado = await MantenimientoDAO.obtenerTodos(pagina, limite); // Cambio aquí
            }
            
            // Convertir a DTOs
            if (resultado.mantenimientos) {
                resultado.mantenimientos = MantenimientoDTO.fromArray(resultado.mantenimientos);
            } else {
                resultado = MantenimientoDTO.fromArray(resultado);
            }
            
            res.json({
                success: true,
                data: resultado
            });
        } catch (error) {
            console.error('Error al obtener mantenimientos:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerMantenimiento(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { id } = req.params;
            const mantenimiento = await MantenimientoDAO.obtenerPorId(id); // Cambio aquí
            
            if (!mantenimiento) {
                return res.status(404).json({
                    success: false,
                    message: 'Mantenimiento no encontrado'
                });
            }

            const mantenimientoDTO = new MantenimientoDTO(mantenimiento);

            res.json({
                success: true,
                data: mantenimientoDTO
            });
        } catch (error) {
            console.error('Error al obtener mantenimiento:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async actualizarMantenimiento(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { id } = req.params;
            const mantenimiento = await MantenimientoDAO.actualizar(id, req.body); // Cambio aquí
            
            if (!mantenimiento) {
                return res.status(404).json({
                    success: false,
                    message: 'Mantenimiento no encontrado'
                });
            }

            const mantenimientoDTO = new MantenimientoDTO(mantenimiento);

            res.json({
                success: true,
                message: 'Mantenimiento actualizado exitosamente',
                data: mantenimientoDTO
            });
        } catch (error) {
            console.error('Error al actualizar mantenimiento:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async eliminarMantenimiento(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { id } = req.params;
            const eliminado = await MantenimientoDAO.eliminar(id); // Cambio aquí
            
            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Mantenimiento no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Mantenimiento eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar mantenimiento:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerMantenimientosPorAeronave(req, res) {
        try {
            const { aeronaveId } = req.params;
            const mantenimientos = await MantenimientoDAO.obtenerPorAeronave(aeronaveId); // Cambio aquí
            const mantenimientosDTO = MantenimientoDTO.fromArray(mantenimientos);
            
            res.json({
                success: true,
                data: mantenimientosDTO
            });
        } catch (error) {
            console.error('Error al obtener mantenimientos por aeronave:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerMantenimientosPorEstado(req, res) {
        try {
            const { estado } = req.params;
            const mantenimientos = await MantenimientoDAO.obtenerPorEstado(estado); // Cambio aquí
            const mantenimientosDTO = MantenimientoDTO.fromArray(mantenimientos);
            
            res.json({
                success: true,
                data: mantenimientosDTO
            });
        } catch (error) {
            console.error('Error al obtener mantenimientos por estado:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerEstadisticasMantenimiento(req, res) {
        try {
            const estadisticas = await MantenimientoDAO.obtenerEstadisticas(); // Cambio aquí

            res.json({
                success: true,
                data: estadisticas
            });
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerProximosMantenimientos(req, res) {
        try {
            const { limite = 5 } = req.query;
            const mantenimientos = await MantenimientoDAO.obtenerProximos(limite); // Cambio aquí
            const mantenimientosDTO = MantenimientoDTO.fromArray(mantenimientos);

            res.json({
                success: true,
                data: mantenimientosDTO
            });
        } catch (error) {
            console.error('Error al obtener próximos mantenimientos:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
}

module.exports = MantenimientoController;
// Exportar TODOS los modelos para uso externo si es necesario
module.exports = {
    setupAssociations,
    // Modelos Base
    Aeronave,
    Vuelo,
    // Modelos Person
    Usuario,
    Piloto,
    // Modelos Miembro
    Miembro,
    // Modelos Mantenimiento
    Mantenimiento,
    TipoMantenimiento,
    MantenimientoController,
    TipoMantenimientoController,
    MantenimientoDAO,
    TipoMantenimientoDAO, // Exportamos el nuevo DAO
    mantenimientoRoutes
};
