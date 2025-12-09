export class MiembroTripulacionInputDTO {
    constructor(data) {
        this.miembro_codigo = data.miembro_codigo;
        this.persona_codigo = data.persona_codigo;
        this.cargo = data.cargo;
        this.activo = data.activo !== undefined ? data.activo : true;
    }
}

export class MiembroTripulacionUpdateDTO {
    constructor(data) {
        this.cargo = data.cargo;
        this.activo = data.activo;
    }
}

export class MiembroTripulacionOutputDTO {
    constructor(miembro) {
        this.miembro_codigo = miembro.miembro_codigo;
        this.cargo = miembro.cargo;
        this.activo = miembro.activo;

        if (miembro.Persona) {
            this.persona = {
                persona_codigo: miembro.Persona.persona_codigo,
                nombre: miembro.Persona.nombre,
                base_codigo: miembro.Persona.base_codigo,
                activo: miembro.Persona.activo
            };
        }
    }
}