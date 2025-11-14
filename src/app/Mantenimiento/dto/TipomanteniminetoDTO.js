// DTO de entrada para crear TipoMantenimiento
export class TipoMantenimientoInputDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.duracion_estimada = data.duracion_estimada;
        this.frecuencia = data.frecuencia;
        this.estado = data.estado ?? true;  // Por defecto TRUE
    }
}

// DTO de entrada para actualizar TipoMantenimiento
export class TipoMantenimientoUpdateDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.duracion_estimada = data.duracion_estimada;
        this.frecuencia = data.frecuencia;
        this.estado = data.estado;
    }
}

// DTO de salida para TipoMantenimiento
export class TipoMantenimientoOutputDTO {
    constructor(tipo) {
        this.id = tipo.id;
        this.nombre = tipo.nombre;
       	this.descripcion = tipo.descripcion;
        this.duracion_estimada = tipo.duracion_estimada;
        this.frecuencia = tipo.frecuencia;
        this.estado = tipo.estado;
        this.createdAt = tipo.createdAt;
        this.updatedAt = tipo.updatedAt;

        // Si tiene mantenimientos relacionados
        if (tipo.mantenimientos) {
            this.mantenimientos = tipo.mantenimientos.map(m => ({
                id: m.id,
                aeronave_id: m.aeronave_id,
                fecha_programada: m.fecha_programada,
                estado: m.estado
            }));
        }
    }

    static fromArray(list) {
        return list.map(item => new TipoMantenimientoOutputDTO(item));
    }
}
