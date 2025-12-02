export class PilotoInputDTO {
    constructor(data) {
        this.piloto_codigo = data.piloto_codigo;
        this.persona_codigo = data.persona_codigo;
        this.horas_vuelo = data.horas_vuelo || 0;
        this.licencia = data.licencia;
        this.fecha_vencimiento_licencia = data.fecha_vencimiento_licencia;
        this.certificaciones = data.certificaciones || [];
        this.activo = data.activo !== undefined ? data.activo : true;
    }
}

export class PilotoUpdateDTO {
    constructor(data) {
        this.horas_vuelo = data.horas_vuelo;
        this.licencia = data.licencia;
        this.fecha_vencimiento_licencia = data.fecha_vencimiento_licencia;
        this.certificaciones = data.certificaciones;
        this.activo = data.activo;
    }
}

export class PilotoOutputDTO {
    constructor(pilotoModel) {
        this.piloto_codigo = pilotoModel.piloto_codigo;
        this.horas_vuelo = pilotoModel.horas_vuelo;
        this.licencia = pilotoModel.licencia;
        this.fecha_vencimiento_licencia = pilotoModel.fecha_vencimiento_licencia;
        this.certificaciones = pilotoModel.certificaciones;
        this.activo = pilotoModel.activo;

        if (pilotoModel.Persona) {
            this.persona = {
                persona_codigo: pilotoModel.Persona.persona_codigo,
                nombre: pilotoModel.Persona.nombre,
                base_codigo: pilotoModel.Persona.base_codigo
            };
        }
    }
}
