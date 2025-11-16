import TipoMantenimientoDAO from "../repositories/TipoMantenimientoDAO.js";
import {TipoMantenimientoInputDTO, TipoMantenimientoUpdateDTO, TipoMantenimientoOutputDTO
} from "../dto/TipomanteniminetoDTO.js";

//   CREAR TIPO DE MANTENIMIENTO
export const crearTipoMantenimiento = async (req, res) => {
    try {
        const inputDTO = new TipoMantenimientoInputDTO(req.body);

        const nombreExiste = await TipoMantenimientoDAO.existeNombre(inputDTO.nombre);
        if (nombreExiste) {
            return res.status(400).json({
                success: false,
                message: "Ya existe un tipo de mantenimiento con ese nombre"
            });
        }

        const creado = await TipoMantenimientoDAO.crear(inputDTO);

        const outputDTO = new TipoMantenimientoOutputDTO(creado);

        return res.status(201).json({
            success: true,
            message: "Tipo de mantenimiento creado exitosamente",
            data: outputDTO
        });

    } catch (error) {
        console.error("Error al crear tipo de mantenimiento:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
};

//     OBTENER TODOS
export const obtenerTiposMantenimiento = async (req, res) => {
    try {
        const tipos = await TipoMantenimientoDAO.obtenerTodos();
        const tiposDTO = TipoMantenimientoOutputDTO.fromArray(tipos);

        return res.json({ success: true, data: tiposDTO });

    } catch (error) {
        console.error("Error al obtener tipos:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

//        OBTENER POR ID
export const obtenerTipoMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;

        const tipo = await TipoMantenimientoDAO.obtenerPorId(id);

        if (!tipo) {
            return res.status(404).json({ success: false, message: "Tipo no encontrado" });
        }

        const dto = new TipoMantenimientoOutputDTO(tipo);

        return res.json({ success: true, data: dto });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

//       ACTUALIZAR
export const actualizarTipoMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;

        const updateDTO = new TipoMantenimientoUpdateDTO(req.body);

        if (updateDTO.nombre) {
            const nombreExiste = await TipoMantenimientoDAO.existeNombre(updateDTO.nombre, id);
            if (nombreExiste) {
                return res.status(400).json({
                    success: false,
                    message: "Ya existe otro tipo con ese nombre"
                });
            }
        }

        const actualizado = await TipoMantenimientoDAO.actualizar(id, updateDTO);
        if (!actualizado) {
            return res.status(404).json({ success: false, message: "Tipo no encontrado" });
        }

        const dto = new TipoMantenimientoOutputDTO(actualizado);

        return res.json({
            success: true,
            message: "Actualizado exitosamente",
            data: dto
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

//          ELIMINAR
export const eliminarTipoMantenimiento = async (req, res) => {
    try {
        const { id } = req.params;

        const eliminado = await TipoMantenimientoDAO.eliminar(id);
        if (!eliminado) {
            return res.status(404).json({ success: false, message: "Tipo no encontrado" });
        }

        return res.json({
            success: true,
            message: "Eliminado exitosamente"
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

//        OBTENER ACTIVOS
export const obtenerTiposActivos = async (req, res) => {
    try {
        const tipos = await TipoMantenimientoDAO.obtenerActivos();
        const tiposDTO = TipoMantenimientoOutputDTO.fromArray(tipos);

        return res.json({ success: true, data: tiposDTO });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

//     OBTENER CON ESTADISTICAS
export const obtenerTiposConEstadisticas = async (req, res) => {
    try {
        const tipos = await TipoMantenimientoDAO.obtenerConEstadisticas();
        const tiposDTO = TipoMantenimientoOutputDTO.fromArray(tipos);

        return res.json({ success: true, data: tiposDTO });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

//   OBTENER POR FRECUENCIA
export const obtenerTiposPorFrecuencia = async (req, res) => {
    try {
        const { min_frecuencia, max_frecuencia } = req.query;

        const tipos = await TipoMantenimientoDAO.obtenerPorFrecuencia(
            min_frecuencia ? parseInt(min_frecuencia) : null,
            max_frecuencia ? parseInt(max_frecuencia) : null
        );

        const tiposDTO = TipoMantenimientoOutputDTO.fromArray(tipos);

        return res.json({ success: true, data: tiposDTO });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

export const obtenerEstadisticasTipos = async (req, res) => {
    try {
        const tipos = await TipoMantenimientoDAO.obtenerTodos(); // o lógica de estadísticas
        const tiposDTO = TipoMantenimientoOutputDTO.fromArray(tipos);

        return res.json({ success: true, data: tiposDTO });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

