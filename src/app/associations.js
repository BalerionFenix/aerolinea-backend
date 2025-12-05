import sequelize from "../config/config_db.js";
//import Aeronave from '../modules/base/models/Aeronave.js';
import Mantenimiento from "./Mantenimiento/models/Mantenimiento.js";
import TipoMantenimiento from "./Mantenimiento/models/TipoMantenimiento.js";
import Rol from "./Usuario/models/Rol.js";
import Usuario from "./Usuario/models/Usuario.js";
import Base from "./Base/models/Base.js";
import Avion from "./Base/models/Avion.js";
import Persona from "./Personal/models/Persona.js";
import Piloto from "./Personal/models/Piloto.js";
import MiembroTripulacion from "./Personal/models/MiembroTripulacion.js";

// Importaciones futuras de modelos que aún no existen
// import Vuelo from '../modules/base/models/Vuelo.js';
// import Usuario from '../modules/person/models/Usuario.js';
// import Piloto from '../modules/person/models/Piloto.js';
// import Miembro from '../modules/miembro/models/Miembro.js';

export const setupAssociations = () => {
    console.log('Configurando TODAS las relaciones de modelos...');

    try {
        // =============================================
        // RELACIONES DEL MÓDULO PERSON (Usuarios, Roles)
        // =============================================

        // Usuario ↔ Rol (Un usuario pertenece a un rol)
        Rol.hasMany(Usuario, {
            foreignKey: 'rol_id',
            as: 'usuarios'
        });

        Usuario.belongsTo(Rol, {
            foreignKey: 'rol_id',
            as: 'rol'
        });

        // Usuario ↔ Base (Un usuario pertenece a una base)
        Base.hasMany(Usuario, {
            foreignKey: 'base_codigo',
            as: 'usuarios'
        });

        Usuario.belongsTo(Base, {
            foreignKey: 'base_codigo',
            as: 'base'
        });

        // =============================================
        // RELACIONES DEL MÓDULO BASE (Aviones)
        // =============================================

        Base.hasMany(Avion, {
            foreignKey: 'base_codigo',
            as: 'aviones'
        });

        Avion.belongsTo(Base, {
            foreignKey: 'base_codigo',
            as: 'base'
        });

        // =============================================
        // RELACIONES DEL MÓDULO PERSON (Usuarios, Pilotos)
        // =============================================

        // Persona ↔ Piloto (1:1)
        Persona.hasOne(Piloto, {
            foreignKey: 'piloto_codigo',
            sourceKey: 'persona_codigo',
            as: 'piloto'
        });

        Piloto.belongsTo(Persona, {
            foreignKey: 'piloto_codigo',
            targetKey: 'persona_codigo',
            as: 'Persona'
        });

        // Persona ↔ MiembroTripulacion (1:1)
        Persona.hasOne(MiembroTripulacion, {
            foreignKey: 'miembro_codigo',
            sourceKey: 'persona_codigo',
            as: 'miembro'
        });

        MiembroTripulacion.belongsTo(Persona, {
            foreignKey: 'miembro_codigo',
            targetKey: 'persona_codigo',
            as: 'Persona'
        });

        // Usuario ↔ Persona (opcional relación)
        Usuario.belongsTo(Persona, {
            foreignKey: 'persona_codigo',
            as: 'persona'
        });

        Persona.hasOne(Usuario, {
            foreignKey: 'persona_codigo',
            sourceKey: 'persona_codigo',
            as: 'usuario'
        });

        // =============================================
        // =============================================
        // RELACIONES DEL MÓDULO MANTENIMIENTO
        // =============================================

        // TipoMantenimiento ↔ Mantenimiento
        TipoMantenimiento.hasMany(Mantenimiento, {
            foreignKey: 'tipo_mantenimiento_id',
            as: 'mantenimientos'
        });

        Mantenimiento.belongsTo(TipoMantenimiento, {
            foreignKey: 'tipo_mantenimiento_id',
            as: 'tipo_mantenimiento'
        });

       /* // Aeronave ↔ Mantenimiento
        Aeronave.hasMany(Mantenimiento, {
            foreignKey: 'aeronave_id',
            as: 'mantenimientos'
        });

        Mantenimiento.belongsTo(Aeronave, {
            foreignKey: 'aeronave_id',
            as: 'aeronave'
        });*/

        // =============================================
        // RELACIONES DEL MÓDULO MIEMBRO
        // =============================================

        // Usuario ↔ Miembro (Un usuario puede ser miembro)
        /*Usuario.hasOne(Miembro, {
            foreignKey: 'usuario_id',
            as: 'miembro'
        });

        Miembro.belongsTo(Usuario, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        });

        // Miembro ↔ Vuelo (Un miembro puede tener vuelos)
        Miembro.hasMany(Vuelo, {
            foreignKey: 'miembro_id',
            as: 'vuelos'
        });

        Vuelo.belongsTo(Miembro, {
            foreignKey: 'miembro_id',
            as: 'miembro'
        });*/

        console.log('Todas las relaciones configuradas correctamente');

    } catch (error) {
        console.error('Error configurando relaciones:', error);
        throw error;
    }
};

