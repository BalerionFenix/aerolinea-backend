// DTO de entrada para creación
export class BaseInputDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.ciudad = data.ciudad;
        this.pais = data.pais;
        this.direccion = data.direccion;
        this.estado = data.estado || "Activo";
    }
}

// DTO de entrada para actualización
export class BaseUpdateDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.ciudad = data.ciudad;
        this.pais = data.pais;
        this.direccion = data.direccion;
        this.estado = data.estado;
    }
}

// DTO de salida
export class BaseOutputDTO {
    constructor(base) {
        this.base_codigo = base.base_codigo;
        this.nombre = base.nombre;
        this.ciudad = base.ciudad;
        this.pais = base.pais;
        this.direccion = base.direccion;
        this.estado = base.estado;
        this.createdAt = base.createdAt;
        this.updatedAt = base.updatedAt;
    }
}
