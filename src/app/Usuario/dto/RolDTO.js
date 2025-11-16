// DTO de entrada para creación de rol
export class RolInputDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion || "";
        this.activo = data.activo !== undefined ? data.activo : true;
    }
}

// DTO de entrada para actualización de rol
export class RolUpdateDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.activo = data.activo;
    }
}

// DTO de salida para responder al cliente
export class RolOutputDTO {
    constructor(rolModel) {
        this.rol_id = rolModel.rol_id;
        this.nombre = rolModel.nombre;
        this.descripcion = rolModel.descripcion;
        this.activo = rolModel.activo;
        this.created_at = rolModel.created_at;
        this.updated_at = rolModel.updated_at;
    }
}
