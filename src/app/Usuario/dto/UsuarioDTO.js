// DTO de entrada para creación de usuario
export class UsuarioInputDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.email = data.email;
        this.rol_id = data.rol_id;
        this.base_codigo = data.base_codigo || null;
        this.persona_codigo = data.persona_codigo || null;
        this.activo = data.activo !== undefined ? data.activo : true;
    }
}

// DTO de entrada para actualización de usuario
export class UsuarioUpdateDTO {
    constructor(data) {
        this.nombre = data.nombre;
        this.email = data.email;
        this.rol_id = data.rol_id;
        this.base_codigo = data.base_codigo;
        this.persona_codigo = data.persona_codigo;
        this.activo = data.activo;
    }
}

// DTO de salida para responder al cliente
export class UsuarioOutputDTO {
    constructor(usuarioModel) {
        this.usuario_id = usuarioModel.usuario_id;
        this.nombre = usuarioModel.nombre;
        this.email = usuarioModel.email;
        this.rol = usuarioModel.rol ? {
            rol_id: usuarioModel.rol.rol_id,
            nombre: usuarioModel.rol.nombre,
            descripcion: usuarioModel.rol.descripcion,
            activo: usuarioModel.rol.activo
        } : null;

        this.base_codigo = usuarioModel.base_codigo;
        this.persona_codigo = usuarioModel.persona_codigo;
        this.activo = usuarioModel.activo;
        this.created_at = usuarioModel.created_at;
        this.updated_at = usuarioModel.updated_at;
    }
}




