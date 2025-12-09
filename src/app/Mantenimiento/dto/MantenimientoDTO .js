// DTO de entrada para creación de Mantenimiento
export class MantenimientoInputDTO {
    constructor(data) {
        this.tipo_mantenimiento_id = data.tipo_mantenimiento_id;
        this.avion_codigo = data.avion_codigo; // <- cambio aquí
        this.fecha_programada = data.fecha_programada;
        this.fecha_inicio = data.fecha_inicio;
        this.fecha_fin = data.fecha_fin;
        this.costo_estimado = data.costo_estimado;
        this.costo_real = data.costo_real;
        this.descripcion = data.descripcion;
        this.personal_asignado = data.personal_asignado;
        this.estado = data.estado || "programado";
    }
}

// DTO de entrada para actualización de Mantenimiento
export class MantenimientoUpdateDTO {
    constructor(data) {
        this.tipo_mantenimiento_id = data.tipo_mantenimiento_id;
        this.avion_codigo = data.avion_codigo; // <- cambio aquí
        this.fecha_programada = data.fecha_programada;
        this.fecha_inicio = data.fecha_inicio;
        this.fecha_fin = data.fecha_fin;
        this.costo_estimado = data.costo_estimado;
        this.costo_real = data.costo_real;
        this.descripcion = data.descripcion;
        this.personal_asignado = data.personal_asignado;
        this.estado = data.estado;
    }
}


// DTO de salida de Mantenimiento
export class MantenimientoOutputDTO {
    constructor(mantenimiento) {
        this.id = mantenimiento.id;
        this.tipo_mantenimiento_id = mantenimiento.tipo_mantenimiento_id;
        this.avion_codigo = mantenimiento.avion_codigo; // <- cambio aquí

        this.fecha_programada = mantenimiento.fecha_programada;
        this.fecha_inicio = mantenimiento.fecha_inicio;
        this.fecha_fin = mantenimiento.fecha_fin;

        this.costo_estimado = mantenimiento.costo_estimado;
        this.costo_real = mantenimiento.costo_real;

        this.descripcion = mantenimiento.descripcion;
        this.estado = mantenimiento.estado;
        this.personal_asignado = mantenimiento.personal_asignado;

        this.createdAt = mantenimiento.createdAt;
        this.updatedAt = mantenimiento.updatedAt;

        // Incluir relaciones si existen
        if (mantenimiento.tipo_mantenimiento) {
            this.tipo_mantenimiento = {
                id: mantenimiento.tipo_mantenimiento.id,
                nombre: mantenimiento.tipo_mantenimiento.nombre,
                descripcion: mantenimiento.tipo_mantenimiento.descripcion,
                duracion_estimada: mantenimiento.tipo_mantenimiento.duracion_estimada,
                frecuencia: mantenimiento.tipo_mantenimiento.frecuencia
            };
        }

        if (mantenimiento.aeronave) {
            this.aeronave = {
                id: mantenimiento.aeronave.id,
                matricula: mantenimiento.aeronave.matricula,
                modelo: mantenimiento.aeronave.modelo
            };
        }
    }

    static fromArray(list) {
        return list.map(item => new MantenimientoOutputDTO(item));
    }
}