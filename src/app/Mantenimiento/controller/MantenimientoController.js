import MantenimientoDAO from "../repositories/MantenimientoDAO.js";
import {
    MantenimientoOutputDTO,
    MantenimientoInputDTO,
    MantenimientoUpdateDTO
} from "../dto/MantenimientoDTO .js";

// Crear mantenimiento
export const crearMantenimiento = async (req, res) => {
    try {
        const inputDTO = new MantenimientoInputDTO(req.body);
        const mantenimiento = await MantenimientoDAO.create(inputDTO);

        res.status(201).json({
            success: true,
            message: "Mantenimiento creado exitosamente",
            data: new MantenimientoOutputDTO(mantenimiento)
        });
    } catch (error) {
        console.error("Error al crear mantenimiento:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Obtener todos los mantenimientos con filtros opcionales
export const obtenerMantenimientos = async (req, res) => {
    try {
        const { estado, aeronave_id } = req.query;
        let resultado;

        if (estado) {
            resultado = await MantenimientoDAO.getByEstado(estado);
        } else if (aeronave_id) {
            resultado = await MantenimientoDAO.getByAeronave(aeronave_id);
        } else {
            // ✅ getAll() ahora devuelve directamente un array
            resultado = await MantenimientoDAO.getAll();
        }

        // Asegurar que resultado sea siempre un array
        if (!Array.isArray(resultado)) {
            resultado = [];
        }

        const mantenimientosArray = MantenimientoOutputDTO.fromArray(resultado);

        res.json({
            success: true,
            data: mantenimientosArray
        });
    } catch (error) {
        console.error("Error al obtener mantenimientos:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Obtener mantenimiento por id - CORREGIDO
export const obtenerMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const mantenimiento = await MantenimientoDAO.getById(id);

        if (!mantenimiento) {
            return res.status(404).json({
                success: false,
                message: "Mantenimiento no encontrado"
            });
        }

        // ✅ Ahora usa el mismo formato que los demás endpoints
        res.json({
            success: true,
            data: new MantenimientoOutputDTO(mantenimiento)
        });
    } catch (error) {
        console.error("Error al obtener mantenimiento:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Actualizar mantenimiento
export const actualizarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDTO = new MantenimientoUpdateDTO(req.body);
        const mantenimiento = await MantenimientoDAO.update(id, updateDTO);

        if (!mantenimiento) {
            return res.status(404).json({
                success: false,
                message: "Mantenimiento no encontrado"
            });
        }

        res.json({
            success: true,
            message: "Mantenimiento actualizado exitosamente",
            data: new MantenimientoOutputDTO(mantenimiento)
        });
    } catch (error) {
        console.error("Error al actualizar mantenimiento:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Eliminar mantenimiento
export const eliminarMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await MantenimientoDAO.delete(id);

        if (!eliminado) {
            return res.status(404).json({
                success: false,
                message: "Mantenimiento no encontrado"
            });
        }

        res.json({
            success: true,
            message: "Mantenimiento eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar mantenimiento:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Obtener mantenimientos por aeronave
export const obtenerMantenimientosPorAeronave = async (req, res) => {
    try {
        const { aeronaveId } = req.params;
        const mantenimientos = await MantenimientoDAO.getByAeronave(aeronaveId);

        res.json({
            success: true,
            data: MantenimientoOutputDTO.fromArray(mantenimientos)
        });
    } catch (error) {
        console.error("Error al obtener mantenimientos por aeronave:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Obtener mantenimientos por estado
export const obtenerMantenimientosPorEstado = async (req, res) => {
    try {
        const { estado } = req.params;
        const mantenimientos = await MantenimientoDAO.getByEstado(estado);

        res.json({
            success: true,
            data: MantenimientoOutputDTO.fromArray(mantenimientos)
        });
    } catch (error) {
        console.error("Error al obtener mantenimientos por estado:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Obtener estadísticas de mantenimientos
export const obtenerEstadisticasMantenimiento = async (req, res) => {
    try {
        const estadisticas = await MantenimientoDAO.getEstadisticas();
        res.json({ success: true, data: estadisticas });
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};

// Obtener próximos mantenimientos
export const obtenerProximosMantenimientos = async (req, res) => {
    try {
        const { limite = 5 } = req.query;
        const mantenimientos = await MantenimientoDAO.getProximos(limite);

        res.json({
            success: true,
            data: MantenimientoOutputDTO.fromArray(mantenimientos)
        });
    } catch (error) {
        console.error("Error al obtener próximos mantenimientos:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message
        });
    }
};