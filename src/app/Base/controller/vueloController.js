import {VueloinputDTO, VueloUpdateDTO, VueloOutputDTO} from "../dto/VueloDTO.js";
import VueloDAO from "../repositories/VueloDAO.js";

// Función auxiliar: calcula duración entre 2 horas
const calcularTiempoVuelo = (hora_salida, hora_llegada) => {
    if (!hora_salida || !hora_llegada) return null;

    const [hs, ms] = hora_salida.split(":").map(Number);
    const [hl, ml] = hora_llegada.split(":").map(Number);

    const salida = new Date();
    salida.setHours(hs, ms, 0, 0);

    const llegada = new Date();
    llegada.setHours(hl, ml, 0, 0);

    if (llegada < salida) llegada.setDate(llegada.getDate() + 1);

    const diffMs = llegada - salida;
    const totalMin = Math.floor(diffMs / 60000);

    const horas = Math.floor(totalMin / 60);
    const minutos = totalMin % 60;

    return {
        tiempo_total: `${horas}h ${minutos}m`,
        total_minutos: totalMin
    };
};

// CREATE
export const createVuelo = async (req, res) => {
    try {
        const vueloData = new VueloinputDTO(req.body);

        // ⬅ CÁLCULO AUTOMÁTICO
        const tiempo = calcularTiempoVuelo(vueloData.hora_salida_real, vueloData.hora_llegada_real);
        if (tiempo) {
            vueloData.duracion_minutos = tiempo.total_minutos;
        }

        const newVuelo = await VueloDAO.create(vueloData);

        const dto = new VueloOutputDTO(newVuelo);
        dto.tiempo_total = tiempo?.tiempo_total || null;
        dto.total_minutos = tiempo?.total_minutos || null;

        res.status(201).json(dto);
    } catch (err) {
        res.status(500).json({ message: "Error creating vuelo", error: err });
    }
};

// GET ALL
export const getVuelos = async (req, res) => {
    try {
        const vuelos = await VueloDAO.getAll();

        const result = vuelos.map(v => {
            const dto = new VueloOutputDTO(v);

            const tiempo = calcularTiempoVuelo(
                v.hora_salida_real,
                v.hora_llegada_real
            );

            dto.tiempo_total = tiempo?.tiempo_total || null;
            dto.total_minutos = tiempo?.total_minutos || null;

            return dto;
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Error fetching vuelos", error: err });
    }
};


// GET BY ID
export const getVuelo = async (req, res) => {
    try {
        const { id } = req.params;
        const vuelo = await VueloDAO.getById(id);

        if (!vuelo) return res.status(404).json({ message: "Vuelo not found" });

        const dto = new VueloOutputDTO(vuelo);

        const tiempo = calcularTiempoVuelo(
            vuelo.hora_salida_real,
            vuelo.hora_llegada_real
        );

        dto.tiempo_total = tiempo?.tiempo_total || null;
        dto.total_minutos = tiempo?.total_minutos || null;

        res.json(dto);

    } catch (err) {
        res.status(500).json({ message: "Error fetching vuelo", error: err });
    }
};





// UPDATE
export const updateVuelo = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = new VueloUpdateDTO(req.body);

        // ⬅ CÁLCULO AUTOMÁTICO
        const tiempo = calcularTiempoVuelo(updateData.hora_salida_real, updateData.hora_llegada_real);
        if (tiempo) {
            updateData.duracion_minutos = tiempo.total_minutos;
        }

        const vuelo = await VueloDAO.update(id, updateData);

        if (!vuelo) return res.status(404).json({ message: "Vuelo not found" });

        const dto = new VueloOutputDTO(vuelo);
        dto.tiempo_total = tiempo?.tiempo_total || null;
        dto.total_minutos = tiempo?.total_minutos || null;

        res.json(dto);
    } catch (err) {
        res.status(500).json({ message: "Error updating vuelo", error: err });
    }
};



// DELETE
export const deleteVuelo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await VueloDAO.delete(id);

        if (!result) return res.status(404).json({ message: "Vuelo not found" });

        res.json({ message: "Vuelo deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting vuelo", error: err });
    }
};