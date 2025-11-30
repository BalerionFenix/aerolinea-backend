// DTO de entrada para creacion
export class VueloinputDTO {
    constructor(data) {
        this.origen = data.origen;
        this.destino = data.destino;
        this.fecha = data.fecha;
        this.hora = data.hora;
        this.avion_codigo = data.avion_codigo;
        this.piloto_codigo = data.piloto_codigo;
        this.hora_salida_real = data.hora_salida_real;
        this.hora_llegada_real = data.hora_llegada_real;
        this.duracion_vuelo = data.duracion_vuelo;
        this.observaciones = data.observaciones;
    }
}

export class VueloUpdateDTO {
    constructor(data) {
        this.origen = data.origen;
        this.destino = data.destino;
        this.estado = data.estado;
        this.fecha = data.fecha;
        this.hora = data.hora;
        this.avion_codigo = data.avion_codigo;
        this.piloto_codigo = data.piloto_codigo;
        this.hora_salida_real = data.hora_salida_real;
        this.hora_llegada_real = data.hora_llegada_real;
        this.duracion_vuelo = data.duracion_vuelo;
        this.observaciones = data.observaciones;
    }
}

export class VueloOutputDTO{
    constructor(data) {
        this.vuelo_num = data.vuelo_num;
        this.origen = data.origen;
        this.destino = data.destino;
        this.fecha = data.fecha;
        this.hora = data.hora;
        this.avion_codigo = data.avion_codigo;
        this.piloto_codigo = data.piloto_codigo;
        this.hora_salida_real = data.hora_salida_real;
        this.hora_llegada_real = data.hora_llegada_real;
        this.duracion_vuelo = data.duracion_vuelo;
        this.observaciones = data.observaciones;
        this.estado = data.estado;
    }
}