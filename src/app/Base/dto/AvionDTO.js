// DTO de entrada para creación
export class AvionInputDTO {
    constructor(data) {
        this.tipo = data.tipo;
        this.modelo = data.modelo;
        this.fabricante = data.fabricante;
        this.capacidad = data.capacidad;
        this.anio_fabricacion = data.anio_fabricacion;
        this.base_codigo = data.base_codigo;
        this.horas_vuelo_totales = data.horas_vuelo_totales;
    }
}

//DTO de entrada para actualizacion
export class AvionUpdateDTO {
    constructor(data) {
        this.tipo = data.tipo;
        this.modelo = data.modelo;
        this.fabricante = data.fabricante;
        this.capacidad = data.capacidad;
        this.anio_fabricacion = data.anio_fabricacion;
        this.base_codigo = data.base_codigo;
        this.horas_vuelo_totales = data.horas_vuelo_totales;
    }
}

//DTO de salida
export class AvionOutputDTO {
    constructor(data) {
        this.avion_codigo = data.avion_codigo;
        this.tipo = data.tipo;
        this.modelo = data.modelo;
        this.fabricante = data.fabricante;
        this.capacidad = data.capacidad;
        this.anio_fabricacion = data.anio_fabricacion;
        this.base_codigo = data.base_codigo;
        this.estado = data.estado;
        this.horas_vuelo_totales = data.horas_vuelo_totales;
        this.ultimo_mantenimiento  = data.ultimo_mantenimiento;
        this.proximo_mantenimiento  = data.proximo_mantenimiento;
        this.activo = data.activo;
    }
}