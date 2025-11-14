const TipoMantenimientoDAO = require('../dao/TipoMantenimientoDAO'); // Cambio aquí
const { TipoMantenimientoDTO } = require('../dto/MantenimientoDTO');
const { validationResult } = require('express-validator');

class TipoMantenimientoController {

    static async crearTipoMantenimiento(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            // Validar si el nombre ya existe
            const nombreExiste = await TipoMantenimientoDAO.existeNombre(req.body.nombre);
            if (nombreExiste) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un tipo de mantenimiento con ese nombre'
                });
            }

            const tipoMantenimiento = await TipoMantenimientoDAO.crear(req.body); // Cambio aquí
            const tipoMantenimientoDTO = new TipoMantenimientoDTO(tipoMantenimiento);
            
            res.status(201).json({
                success: true,
                message: 'Tipo de mantenimiento creado exitosamente',
                data: tipoMantenimientoDTO
            });
        } catch (error) {
            console.error('Error al crear tipo de mantenimiento:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerTiposMantenimiento(req, res) {
        try {
            const tipos = await TipoMantenimientoDAO.obtenerTodos(); // Cambio aquí
            const tiposDTO = TipoMantenimientoDTO.fromArray(tipos);
            
            res.json({
                success: true,
                data: tiposDTO
            });
        } catch (error) {
            console.error('Error al obtener tipos de mantenimiento:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerTipoMantenimiento(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { id } = req.params;
            const tipo = await TipoMantenimientoDAO.obtenerPorId(id); // Cambio aquí
            
            if (!tipo) {
                return res.status(404).json({
                    success: false,
                    message: 'Tipo de mantenimiento no encontrado'
                });
            }

            const tipoDTO = new TipoMantenimientoDTO(tipo);

            res.json({
                success: true,
                data: tipoDTO
            });
        } catch (error) {
            console.error('Error al obtener tipo de mantenimiento:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async actualizarTipoMantenimiento(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { id } = req.params;

            // Validar si el nombre ya existe (excluyendo el actual)
            if (req.body.nombre) {
                const nombreExiste = await TipoMantenimientoDAO.existeNombre(req.body.nombre, id);
                if (nombreExiste) {
                    return res.status(400).json({
                        success: false,
                        message: 'Ya existe otro tipo de mantenimiento con ese nombre'
                    });
                }
            }

            const tipo = await TipoMantenimientoDAO.actualizar(id, req.body); // Cambio aquí
            
            if (!tipo) {
                return res.status(404).json({
                    success: false,
                    message: 'Tipo de mantenimiento no encontrado'
                });
            }

            const tipoDTO = new TipoMantenimientoDTO(tipo);

            res.json({
                success: true,
                message: 'Tipo de mantenimiento actualizado exitosamente',
                data: tipoDTO
            });
        } catch (error) {
            console.error('Error al actualizar tipo de mantenimiento:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async eliminarTipoMantenimiento(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const { id } = req.params;
            const eliminado = await TipoMantenimientoDAO.eliminar(id); // Cambio aquí
            
            if (!eliminado) {
                return res.status(404).json({
                    success: false,
                    message: 'Tipo de mantenimiento no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Tipo de mantenimiento eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error al eliminar tipo de mantenimiento:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerTiposActivos(req, res) {
        try {
            const tipos = await TipoMantenimientoDAO.obtenerActivos(); // Cambio aquí
            const tiposDTO = TipoMantenimientoDTO.fromArray(tipos);
            
            res.json({
                success: true,
                data: tiposDTO
            });
        } catch (error) {
            console.error('Error al obtener tipos activos:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerTiposConEstadisticas(req, res) {
        try {
            const tipos = await TipoMantenimientoDAO.obtenerConEstadisticas(); // Cambio aquí
            const tiposDTO = TipoMantenimientoDTO.fromArray(tipos);
            
            res.json({
                success: true,
                data: tiposDTO
            });
        } catch (error) {
            console.error('Error al obtener tipos con estadísticas:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    static async obtenerTiposPorFrecuencia(req, res) {
        try {
            const { min_frecuencia, max_frecuencia } = req.query;
            const tipos = await TipoMantenimientoDAO.obtenerPorFrecuencia(
                min_frecuencia ? parseInt(min_frecuencia) : null,
                max_frecuencia ? parseInt(max_frecuencia) : null
            ); // Cambio aquí
            const tiposDTO = TipoMantenimientoDTO.fromArray(tipos);
            
            res.json({
                success: true,
                data: tiposDTO
            });
        } catch (error) {
            console.error('Error al obtener tipos por frecuencia:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }
}

module.exports = TipoMantenimientoController;