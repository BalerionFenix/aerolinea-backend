// DTO de entrada para creación
export class BaseInputDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.ciudad = data.ciudad;
        this.pais = data.pais;
        this.direccion = data.direccion;
    }
}

// DTO de entrada para actualización
export class BaseUpdateDTO {
    constructor(data) {
        this.nuevoNombre = data.nuevoNombre;
        this.ciudad = data.ciudad;
        this.pais = data.pais;
        this.direccion = data.direccion;
    }
}

// DTO de salida
export class BaseOutputDTO {
    constructor(base) {
        this.nombre = base.nombre;
        this.ciudad = base.ciudad;
        this.pais = base.pais;
        this.direccion = base.direccion;
    }
}
