export class PersonaInputDTO {
    constructor(data) {
        this.persona_codigo = data.persona_codigo;
        this.nombre = data.nombre;
        this.base_codigo = data.base_codigo;
        this.activo = data.activo !== undefined ? data.activo : true;
    }
}

export class PersonaUpdateDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.base_codigo = data.base_codigo;
        this.activo = data.activo;
    }
}

export class PersonaOutputDTO {
    constructor(personaModel) {
        this.persona_codigo = personaModel.persona_codigo;
        this.nombre = personaModel.nombre;
        this.base_codigo = personaModel.base_codigo;
        this.activo = personaModel.activo;
        this.created_at = personaModel.created_at;
        this.updated_at = personaModel.updated_at;
    }
}
